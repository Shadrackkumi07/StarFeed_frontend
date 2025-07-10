import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import api from '../api';
import './Comments.css';

// ReplyForm component to isolate reply input state
const ReplyForm = ({ parentId, onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(text, parentId);
    setText('');
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        rows="2"
        placeholder="Write a reply…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="comment-actions">
        <button type="submit" className="comment-save-btn">
          Post Reply
        </button>
        <button type="button" onClick={onCancel} className="comment-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default function Comments({ itemId }) {
  const { currentUser } = useAuth();

  // flat list & tree
  const [flatComments, setFlatComments] = useState([]);
  const [commentsTree, setCommentsTree] = useState([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // new top-level comment
  const [newText, setNewText] = useState('');

  // replies: which comment we’re replying to
  const [replyTo, setReplyTo] = useState(null);

  // editing existing comment
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 1. Build nested tree from flat list
  const buildTree = list => {
    const map = {};
    list.forEach(c => { map[c._id] = { ...c, replies: [] }; });
    const roots = [];
    list.forEach(c => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].replies.push(map[c._id]);
      } else {
        roots.push(map[c._id]);
      }
    });
    return roots;
  };

  // 2. Fetch flat comments & build tree
  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await api.get('/comments', { params: { itemId } });
      setFlatComments(resp.data);
      setCommentsTree(buildTree(resp.data));
    } catch {
      setError('Could not load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [itemId]);

  // 3. Post (new or reply)
  const postComment = async (text, parentId = null) => {
    if (!text.trim()) return;
    try {
      const token = await currentUser.getIdToken();
      await api.post(
        '/comments',
        { itemId, text, parentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // clear appropriate field
      if (parentId) {
        setReplyTo(null);
      } else {
        setNewText('');
      }
      fetchComments();
    } catch {
      setError('Could not post comment');
    }
  };

  // 4. Update
  const updateComment = async () => {
    if (!editText.trim()) return;
    try {
      const token = await currentUser.getIdToken();
      await api.put(
        `/comments/${editingId}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditText('');
      fetchComments();
    } catch {
      setError('Could not update comment');
    }
  };

  // 5. Delete
  const deleteComment = async id => {
    try {
      const token = await currentUser.getIdToken();
      await api.delete(`/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments();
    } catch {
      setError('Could not delete comment');
    }
  };

  // 6. Recursive node
  const CommentNode = ({ node, depth = 0 }) => (
    <li className="comment-card" style={{ marginLeft: depth * 16 }}>
      {/* Edit mode */}
      {editingId === node._id ? (
        <div className="comment-body">
          <textarea
            className="comment-input"
            rows="2"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <div className="comment-actions">
            <button onClick={updateComment} className="comment-save-btn">
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="comment-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-body">
          <span className="comment-author">
            {currentUser.email.split('@')[0]}
          </span>
          <p className="comment-text">{node.text}</p>
          <div className="comment-meta">
            <span className="comment-time">
              {new Date(node.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="comment-actions">
            <button
              onClick={() => setReplyTo(node._id)}
              className="comment-reply-btn"
            >
              Reply
            </button>
            {node.userId === currentUser.uid && (
              <>
                <button
                  onClick={() => {
                    setEditingId(node._id);
                    setEditText(node.text);
                  }}
                  className="comment-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(node._id)}
                  className="comment-delete-btn"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Reply form */}
      {replyTo === node._id && (
        <ReplyForm
          parentId={node._id}
          onSubmit={postComment}
          onCancel={() => setReplyTo(null)}
        />
      )}

      {/* Children */}
      {node.replies.length > 0 && (
        <ul>
          {node.replies.map(child => (
            <CommentNode key={child._id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );

  // 7. Render
  if (loading) return <p className="comments-loading">Loading comments…</p>;
  if (error) return <p className="comments-error">{error}</p>;

  return (
    <div className="comments-section">
      <h4 className="comments-title">Comments</h4>

      {/* New comment */}
      <form
        className="comment-form"
        onSubmit={e => {
          e.preventDefault();
          postComment(newText, null);
        }}
      >
        <textarea
          className="comment-input"
          rows="3"
          placeholder="Add a comment…"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button
          type="submit"
          disabled={!newText.trim()}
          className="comment-submit-btn"
        >
          Post
        </button>
      </form>

      {/* Threaded list */}
      <ul className="comment-list">
        {commentsTree.map(node => (
          <CommentNode key={node._id} node={node} />
        ))}
      </ul>
    </div>
  );
}