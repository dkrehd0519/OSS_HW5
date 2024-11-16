import React from "react";
import "./ShowList.css";
import $ from "jquery";

function ShowList() {
  function getDataFromJSONFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        $("#div_BookList").html("");
        let book = JSON.parse(xhr.response);

        book.forEach((item) => {
          $("#div_BookList").append(`
                <div class="book-item">
                  <span class="book-id">${item.id}</span>
                  <span class="book-name">${item.name}</span>
                  <span class="book-author">${item.author}</span>
                  <span class="book-price">${item.price}</span>
                </div>
              `);
        });
      }
    };
  }

  function postDataToJSONFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    let data = {
      name: $("#book_name").val(),
      author: $("#book_author").val(),
      price: $("#book_price").val(),
    };

    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
      console.log(xhr.status);
      if (xhr.status === 201) {
        alert("책 리스트가 추가되었습니다.");
        window.location.reload();
      }
    };
  }

  function updateDataToJSONFile() {
    let id = $("#book_id_update").val();
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books/" + id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    let data = {
      name: $("#book_name_update").val(),
      author: $("#book_author_update").val(),
      price: $("#book_price_update").val(),
    };

    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert("책의 정보가 수정되었습니다.");
        window.location.reload();
      } else if (xhr.status === 404) {
        alert("해당 id는 존재하지 않습니다.");
      } else alert("id를 입력하세요.");
    };
  }

  function deleteDataFromJSONFile() {
    let id = $("#book_id_delete").val();
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books/" + id);

    xhr.send();
    xhr.onload = () => {
      console.log("status : " + xhr.status);
      if (xhr.status === 200) {
        alert("책이 삭제되었습니다.");
        window.location.reload();
      } else if (xhr.status === 404) {
        alert("해당 id는 존재하지 않습니다.");
      } else alert("id를 입력하세요.");
    };
  }
  window.onload = getDataFromJSONFile();

  return (
    <div>
      <h1>Book List</h1>
      <p>페이지를 새로고침 할 때마다 Book List 가 자동으로 불러와집니다.</p>
      <p>책을 추가, 수정, 삭제하고 싶으시면 오른쪽 버튼을 통해 모달에 들어가 진행해주시면 됩니다.</p>
      <p>책의 id는 list의 가장 왼쪽에 있는 순서입니다.</p>
      <div class="main-container">
        <div id="div_BookList"></div>

        <div class="form-container">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            ADD BOOK
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    ADD BOOK
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    NAME : <input type="text" placeholder="name" id="book_name" />
                  </div>
                  <div class="input-group">
                    AUTHOR : <input type="text" placeholder="author" id="book_author" />
                  </div>
                  <div class="input-group">
                    PRICE : <input type="number" placeholder="price" id="book_price" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={postDataToJSONFile}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
            UPDATE BOOK INFO
          </button>

          <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="updateModalLabel">
                    UPDATE BOOK INFO
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    NAME : <input type="text" placeholder="name" id="book_name_update" />
                  </div>
                  <div class="input-group">
                    AUTHOR : <input type="text" placeholder="author" id="book_author_update" />
                  </div>
                  <div class="input-group">
                    PRICE : <input type="number" placeholder="price" id="book_price_update" />
                  </div>
                  <div class="input-group">
                    ID : <input type="text" placeholder="id" id="book_id_update" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={updateDataToJSONFile}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
            DELETE BOOK
          </button>

          <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="deleteModalLabel">
                    DELETE BOOK
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    ID : <input type="text" placeholder="id" id="book_id_delete" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={deleteDataFromJSONFile}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowList;
