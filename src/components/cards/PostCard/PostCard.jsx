import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import "./PostCard.css";
import { infoNotify } from "../../../utils/getNotify";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, base_url, auth }) => {
  const [commentText, setCommentText] = useState("");
  const [showFull,setshowFull] = useState(false);
  const queryClient = useQueryClient();
  const sortedComments =
    post?.comments
      .slice()
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) || [];

  const navigate = useNavigate();

  // Like mutation
  const likeMutation = async () => {
    const response = await axios.patch(
      `${base_url}/posts/${post._id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    infoNotify(response.data.message);
    return response.data;
  };

  //comment add mutation

  const commentAddMutation = async () => {
    const response = await axios.post(
      `${base_url}/posts/${post._id}/comments`,
      { text: commentText },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    infoNotify(response.data.message);
    return response.data;
  };

  //delete comment
  const commentDeleteMutation = async (commentId) => {
    const response = await axios.delete(
      `${base_url}/posts/${post._id}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    infoNotify(response.data.message);
    return response.data;
  };

  const deletePostMutation = async (postId) => {
    try {
      const response = await axios.delete(
        `${base_url}/post/delete/${postId}`,
        
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      infoNotify(response.data.message);
      return response.data;
    } catch (error) {
      errorNotify(error.data.message);
      console.log(error);
    }
  };

  const { mutate: likePost, isLoading: isLikeLoading } = useMutation({
    mutationFn: likeMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allposts"] });
    },
  });
  const { mutate: addComment, isLoading: isCommentLoading } = useMutation({
    mutationFn: commentAddMutation,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["allposts"] });
    },
  });
  const { mutate: deleteComment, isLoading: isCommentDeleteLoading } =
    useMutation({
      mutationFn: commentDeleteMutation,
      onSuccess: () => {
        setCommentText("");
        queryClient.invalidateQueries({ queryKey: ["allposts"] });
      },
    });
  const { mutate: deletePost, isLoading: isPostDeleting } = useMutation({
    mutationFn: deletePostMutation,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["allposts"] });
    },
  });

  const handleNavigate = (item) => {
    navigate("/update-post", {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };

  return (
    <div className="blog-post-card">
      <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
      <p className="font-medium mb-4">Author: {post.author.name}</p>
      {post.picture && <img src={post.picture} alt={post.title} />}
      {!showFull ? (
        <p className="my-4 whitespace-pre-wrap">
          {post.content.slice(0, 200) + "..."}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setshowFull(true)}
          >
            See more
          </span>
        </p>
      ) : (
        <p className="my-4 whitespace-pre-wrap">{post.content}</p>
      )}

      <div className="my-4 flex items-center justify-between">
        <div>
          {post?.likes?.includes(auth?.user?._id) ? (
            <div className="flex gap-5 items-center">
              <div
                className="bg-transparent cursor-pointer"
                onClick={() => likePost()}
              >
                <i className="fa-solid fa-thumbs-down text-2xl"></i>
              </div>
              <div>{post.likes.length}</div>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <div
                className="bg-transparent cursor-pointer"
                onClick={() => likePost()}
              >
                <i className="fa-solid fa-thumbs-up text-2xl"></i>
              </div>
              <div>{post.likes.length}</div>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          {/* update */}
          <div className="cursor-pointer" onClick={() => handleNavigate(post)}>
            <i className="fa-regular fa-pen-to-square text-2xl"></i>
          </div>
          <div className="cursor-pointer" onClick={() => deletePost(post?._id)}>
            <i className="fa-regular fa-trash-can text-2xl"></i>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
        }}
      >
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button
          className="rounded-md bg-primary py-3 px-4 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Post Comment
        </button>
      </form>
      {post?.comments?.length > 0 && (
        <div className="comments">
          <h3 className="font-semibold">Comments:({post?.comments?.length})</h3>
          {sortedComments.map((comment) => (
            <div key={comment._id} className="comment bg-slate-300 rounded p-4">
              <p className="font-semibold">{comment?.author?.name}</p>
              <p>{comment.text}</p>
              {auth?.user?._id == comment?.author?._id && (
                <div
                  className="text-end underline text-blue-700 cursor-pointer"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
