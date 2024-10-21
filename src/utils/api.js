const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // API Auth
  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.message;
  }

  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  // API Users
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.data.user;
  }

  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.message;
  }

  // Posts APIs
  async function addNewPost({ cover, description }) {
    const formData = new FormData();
    formData.append("cover", cover);
    formData.append("description", description);

    const response = await _fetchWithAuth(`${BASE_URL}/posts`, {
      method: "POST",
      body: formData,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.post_id;
  }

  async function changeCoverPost({ id, cover }) {
    const formData = new FormData();
    formData.append("cover", cover);

    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/cover`, {
      method: "POST",
      body: formData,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function updatePost({ id, description }) {
    const params = new URLSearchParams();
    params.append("description", description);

    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function getAllPosts(isMe = 1) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts?is_me=${isMe}`, {
      method: "GET",
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.posts;
  }

  async function getPostDetail(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}`, {
      method: "GET",
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.post;
  }

  async function deletePost(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function addLike({ id, like }) {
    const params = new URLSearchParams();
    params.append("like", like);

    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function addComment({ id, comment }) {
    const params = new URLSearchParams();
    params.append("comment", comment);

    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function deleteComment(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/comments`, {
      method: "DELETE",
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postChangePhotoProfile,
    addNewPost,
    changeCoverPost,
    updatePost,
    getAllPosts,
    getPostDetail,
    deletePost,
    addLike,
    addComment,
    deleteComment,
  };
})();

export default api;
