import style from "styles/post-detail.module.scss"

export default function PostDetail(){
  return(<body>
    <section id="postContainer">
      <header>
        <div id="poster">
          <img id="icon" src="/imgs/favicon.ico" width="40px" height="40px"></img>
          <h3 id="username">username</h3>
          <img id="threeDots" src="/imgs/three_dots.png" width="30px" height="30px"></img>
        </div>
      </header>
      <main>
        <div id="textbox">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        </div>
      </main>
      <footer>
        <div id="reactions">
          <img className="{style.emoticons}" src="/imgs/emoticons/grinning_face_with_big_eyes_color.svg" width="30px" height="30px"></img>
          <img className="{style.emoticons}" src="/imgs/emoticons/crying_face_color.svg" width="30px" height="30px"></img>
          <img className="{style.emoticons}" src="/imgs/emoticons/angry_face_color.svg" width="30px" height="30px"></img>
          <img className="{style.emoticons}" src="/imgs/emoticons/face_with_open_mouth_color.svg" width="30px" height="30px"></img>
          <b id="sum">25</b>
        </div>
        <div id="tagContainer"></div>
        <p className={`${style.tags} ${style.locationTag}`}>Montreal</p>
        <p className={`${style.tags} ${style.locationTag}`}>Canada</p>
        <p className={`${style.tags} ${style.topicTag}`}>Sexism</p>
        <p className={`${style.tags} ${style.topicTag}`}>Racism</p>
        <p className={`${style.tags} ${style.languageTag}`}>English</p>
      </footer>
    </section>
  </body>)
}