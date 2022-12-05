import React, {useEffect, useRef} from 'react';
import './E_make.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function E_make() {
    const [category, setCategory] = useState([]);
    const form = useRef();
    let data = new FormData();
    useEffect(() => {
        let model = {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("email")
            }
        };
        fetch(`/api/cate`, model)
          .then((res) => res.json())
          .then((res) => setCategory(res));
    }, []);

    function handleSavePost(event) {
        event.preventDefault();
        data.append("client_email", localStorage.getItem("email"));
        const value = Object.fromEntries(data.entries());
        let model = {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                Authorization: localStorage.getItem("email"),
                'Content-Type': 'application/json'
            }
        };
        fetch(`/api/posts`, model)
          .then((res) => res.json())
          .then((res) => {
              window.alert("심부름이 등록되었습니다.");
              window.location.replace("/Home")
          })
    };

    function testFunc() {
        data = new FormData(form.current);
    }

    return (
        <div>
            <div className='Errandmake'>
                <form onSubmit={handleSavePost} onChange={testFunc} ref={form}>
                    <div class="container">
                        <h3 class="main">상품명</h3>
                        <div class="col-3">
                            <input class="effect-1" type="text" placeholder="  Placeholder Text" name="product" />
                            <span class="focus-border"></span>
                        </div>
                    </div>
                    <div class="container">
                        <h3 class="main">카테고리</h3>
                        <select class="selectbox" name="category">
                            {
                            category.map(
                                t => {
                                    return (
                                    <option value={t.id}>{t.context}</option>
                                    )
                                }
                            )
                            }
                        </select>
                    </div>
                    <div class="container">
                        <h3 class="main">상품 비용</h3>
                        <div class="col-3">
                            <input class="effect-1" type="text" placeholder="  Placeholder Text" name="cost" />
                            <span class="focus-border"></span>
                        </div>
                    </div>
                    <div class="container">
                        <h3 class="main">심부름 비용</h3>
                        <div class="col-3">
                            <input class="effect-1" type="text" placeholder="  Placeholder Text" name="fee" />
                            <span class="focus-border"></span>
                        </div>
                    </div>
                    <div class="container">
                        <h3 class="main">심부름 내용</h3>
                        <div >
                            <textarea class="textarea" placeholder="심부름 내용을 입력해주세요" name="contents"></textarea>
                        </div>
                    </div>
                    <div className="container">
                        <h3 className="main">거래 장소</h3>
                        <div>
                            <textarea className="textarea" placeholder="거래할 장소를 입력해주세요" name="destination"></textarea>
                        </div>
                    </div>
                </form>
                <div className='button_row'>
                    <input type="submit" className="button" value="등록" onClick={handleSavePost}></input>
                </div>
            </div >
            <div className="footer">&copy;{new Date().getFullYear()} Errand App</div>
        </div>
    );
}

export default E_make;