// 
const btns = document.querySelectorAll(".button");
const outPut = document.querySelector('#cardWrap');

// btnsとoutPutの中身をコンソールに表示
console.log(btns);
console.log(outPut);

// もし
if (btns) {
    // どれかのボタンをどうかした時
    btns.forEach((btn) => {
        // ボタンをクリックした時
        btn.addEventListener('click', () => {

            //非同期関数。引数(dir)で、ボタンのdata値を入れて、下記取得APIのURLを判別させる。
            const getMovieData = async (dir) => {
                // URLの取得（サイトで登録したキー含む）
                const url = `https://api.themoviedb.org/3/movie/${dir}?api_key=af224ec1282df7f97fcdecabe78c99ad&language=en-JP&page=1`;

                // urlをjsonに取ってくるのを待つ・・・
                const json = await fetch(url)
                    // 上手く行った場合
                    .then((response) => {
                        console.log('非同期処理成功!');
                        return response.json();
                    })
                    // 上手くいかなかった場合
                    .catch(error => {
                        console.error('非同期処理失敗!', error);
                        return null;
                    });

                // jsonのresultsをコンソールに表示
                console.log(json.results);

                // もし
                if (json.results) {
                    // map内だと加工の都度消してしまうので、成功判定あれば中身を消す。
                    outPut.textContent = '';
                }

                // 配列を全て（一つ一つ）加工
                json.results.map((movie) => {

                    // 変数mvImgSrcが
                    let mvImgSrc = ``;
                    // もし、movie.poster_pathが真ならば結果を表示
                    if (movie.poster_path) {
                        mvImgSrc = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
                        // それ以外は、noimgの画像を表示
                    } else {
                        mvImgSrc = `https://placehold.jp/747476/ffffff/185x278.png?text=No%20Image`;
                    }

                    // 
                    let listContent = `
							<li class="card isFade">
								<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener">
									<p class="mvTitle">${movie.title}</p>
									<img src="${mvImgSrc}" class="mvImg">
								</a>
							</li>
						`;

                    // 
                    const outPut = document.querySelector('#cardWrap');
                    console.log(outPut);

                    // isShowがついていなければulに挿入
                    if (!outPut.classList.contains('isShow')) {
                        outPut.insertAdjacentHTML("afterbegin", listContent);
                    }
                    // すでにあれば上に追加。
                    else if (outPut.classList.contains('isShow')) {
                        outPut.insertAdjacentHTML("afterbegin", listContent);
                    }
                });

                // 表示状態付け替え
                if (outPut.classList.contains('isHidden')) {
                    outPut.classList.remove('isHidden');
                    outPut.classList.add('isShow', dir);
                }

                // 表示判別テキスト
                const desc = document.querySelector('#desc');
                let dirName = '';
                switch (dir) {
                    // case 'now_playing':
                    //     dirName = '上映中'
                    //     break;
                    case 'popular':
                        dirName = '人気'
                        break;
                    // case 'top_rated':
                    //     dirName = '高評価'
                    //     break;
                    // case 'upcoming':
                    //     dirName = '今後'
                    //     break;
                }
                // desc.textContent = dirName;

                console.log(dir);
            }

            //btnのdata値により発火
            const movieType = btn.dataset.movie;
            getMovieData(movieType);

        });
    });


}



// === selectで取得処理 =======

const select = document.querySelector('#select');

if (select) {
    select.addEventListener('change', () => {
        const selectedVal = select.value;

        console.log(select);


        if (selectedVal === '0') {
            return false;
        }

        //非同期関数。引数dirで、ボタンのvalue値入れて、取得APIのURLを判別させる。
        const getPersonData = async (id) => {
            // URLの取得（サイトで登録したキー含む）
            const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=af224ec1282df7f97fcdecabe78c99ad&language=en-JP&page=1`;

            const json = await fetch(url)
                .then((response) => {
                    console.log('非同期処理成功!');
                    return response.json();
                }).catch(error => {
                    console.error('非同期処理失敗!', error);
                    return null;
                });

            console.log(json.cast);

            if (json.cast) {
                // map内だと加工の都度消してしまうので、成功判定あれば中身を消す。
                outPut.textContent = '';
                // ソート出来ないので有名作が上に来るように配列を逆にする。
                json.cast.reverse();
            }

            // 配列を全て（一つ一つ）加工
            json.cast.map((movie) => {

                // img
                let mvImgSrc = ``;
                if (movie.poster_path) {
                    mvImgSrc = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
                } else {
                    mvImgSrc = `https://placehold.jp/747476/ffffff/185x278.png?text=No%20Image`;
                }

                let listContent = `
					<li class="card isFade">
						<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener">
							<p class="mvTitle">${movie.title}</p>
							<img src="${mvImgSrc}" class="mvImg">
						</a>
					</li>
				`;

                const outPut = document.querySelector('#cardWrap');

                // isShowがついていなければulに挿入
                if (!outPut.classList.contains('isShow')) {
                    outPut.insertAdjacentHTML("afterbegin", listContent);
                }
                // すでにあれば上に追加。
                else if (outPut.classList.contains('isShow')) {
                    outPut.insertAdjacentHTML("afterbegin", listContent);
                }
            });

            // 表示状態付け替え
            if (outPut.classList.contains('isHidden')) {
                outPut.classList.remove('isHidden');
                outPut.classList.add('isShow', 'person');
            }

            // 表示判別テキスト
            const desc = document.querySelector('#desc');
            const optionText = select.options[select.selectedIndex].text;

            console.log(select);

        }

        //btnのvalue値により発火
        getPersonData(selectedVal);

    });
}


// resetボタン
const resetBtn = document.querySelector('#buttonReset');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        outPut.innerHTML = '';
        if (outPut.classList.contains('isShow')) {
            outPut.classList.remove('isShow');
            outPut.classList.add('isHidden');
        }
        desc.textContent = '';
    });
}

