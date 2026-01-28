async function LoadData() {
  let response = await fetch("http://localhost:3000/posts");
  if (response.ok) {
    let posts = await response.json();
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    posts.forEach((post) => {
      let row = document.createElement("tr");
      if (post.isDeleted === true) {
        row.innerHTML = `
          <td><s>${post.id}</s></td>
          <td><s>${post.title}</s></td>
          <td><s>${post.views}</s></td>
          <td><button onclick="Restore('${post.id}')">Khôi phục</button></td>
        `;
      } else {
        row.innerHTML = `
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.views}</td>
          <td>
            <button onclick="EditPost('${post.id}')">Sửa</button> 
            <button onclick="Delete('${post.id}')">Xóa mềm</button>
          </td>
        `;
      }
      tableBody.appendChild(row);
    });
  }
}

async function EditPost(id) {
  let response = await fetch("http://localhost:3000/posts/" + id);
  if (response.ok) {
    let post = await response.json();
    document.getElementById("post_id_edit").value = post.id;
    document.getElementById("title_txt").value = post.title;
    document.getElementById("view_txt").value = post.views;
    document.getElementById("btnSavePost").innerText = "Update Post";
  }
}

async function Save() {
  let editId = document.getElementById("post_id_edit").value;
  let title = document.getElementById("title_txt").value;
  let views = document.getElementById("view_txt").value;

  if (editId === "") {
    let response = await fetch("http://localhost:3000/posts");
    let posts = await response.json();
    let maxId = posts.reduce((max, post) => {
      let id = parseInt(post.id);
      return id > max ? id : max;
    }, 0);

    let id = (maxId + 1).toString();

    let res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: title,
        views: views,
        isDeleted: false,
      }),
    });
    if (res.ok) alert("Tạo bài viết thành công!");
  } else {
    let res = await fetch("http://localhost:3000/posts/" + editId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        views: views,
      }),
    });
    if (res.ok) {
      alert("Cập nhật bài viết thành công!");
      document.getElementById("post_id_edit").value = "";
      document.getElementById("btnSavePost").innerText = "Save Post";
    }
  }
  document.getElementById("title_txt").value = "";
  document.getElementById("view_txt").value = "";
  LoadData();
}

async function Delete(id) {
  let res = await fetch("http://localhost:3000/posts/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: true }),
  });
  if (res.ok) {
    alert("Đã chuyển bài viết sang xóa mềm!");
    LoadData();
  }
}

async function Restore(id) {
  let res = await fetch("http://localhost:3000/posts/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: false }),
  });
  if (res.ok) {
    alert("Đã khôi phục bài viết!");
    LoadData();
  }
}

async function LoadComments() {
  let response = await fetch("http://localhost:3000/comments");
  if (response.ok) {
    let comments = await response.json();
    let commentBody = document.getElementById("commentBody");
    commentBody.innerHTML = "";

    comments.forEach((cmt) => {
      let row = document.createElement("tr");
      if (cmt.isDeleted === true) {
        row.innerHTML = `
          <td><s>${cmt.id}</s></td>
          <td><s>${cmt.text}</s></td>
          <td><s>${cmt.postId}</s></td>
          <td><button onclick="RestoreComment('${cmt.id}')">Khôi phục</button></td>
        `;
      } else {
        row.innerHTML = `
          <td>${cmt.id}</td>
          <td>${cmt.text}</td>
          <td>${cmt.postId}</td>
          <td>
            <button onclick="EditComment('${cmt.id}')">Sửa</button>
            <button onclick="SoftDeleteComment('${cmt.id}')">Xóa mềm</button>
          </td>
        `;
      }
      commentBody.appendChild(row);
    });
  }
}

async function SaveComment() {
  let editId = document.getElementById("comment_id_edit").value;
  let text = document.getElementById("comment_text").value;
  let postId = document.getElementById("comment_postid").value;

  if (editId === "") {
    let resp = await fetch("http://localhost:3000/comments");
    let comments = await resp.json();
    let maxId = comments.reduce(
      (max, c) => Math.max(max, parseInt(c.id) || 0),
      0
    );
    let newId = (maxId + 1).toString();

    await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newId,
        text: text,
        postId: postId,
        isDeleted: false,
      }),
    });
    alert("Thêm bình luận thành công!");
  } else {
    await fetch("http://localhost:3000/comments/" + editId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, postId: postId }),
    });
    alert("Cập nhật bình luận thành công!");
    document.getElementById("comment_id_edit").value = "";
    document.getElementById("btnSaveComment").innerText = "Save Comment";
  }
  document.getElementById("comment_text").value = "";
  document.getElementById("comment_postid").value = "";
  LoadComments();
}

async function EditComment(id) {
  let response = await fetch("http://localhost:3000/comments/" + id);
  let cmt = await response.json();
  document.getElementById("comment_id_edit").value = cmt.id;
  document.getElementById("comment_text").value = cmt.text;
  document.getElementById("comment_postid").value = cmt.postId;
  document.getElementById("btnSaveComment").innerText = "Update Comment";
}

async function SoftDeleteComment(id) {
  let res = await fetch("http://localhost:3000/comments/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: true }),
  });
  if (res.ok) {
    alert("Đã chuyển bình luận sang xóa mềm!");
    LoadComments();
  }
}

async function RestoreComment(id) {
  let res = await fetch("http://localhost:3000/comments/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: false }),
  });
  if (res.ok) {
    alert("Đã khôi phục bình luận!");
    LoadComments();
  }
}

LoadData();
LoadComments();
