import React from 'react';
import './styles/Main-modal.css';

function main({ darkMode, handleToggle }) {
  return (
    <div className="container">
        <div className="sidebar">
          <h2 className="logo">F1B4</h2>
          <ul>
          <li className="active">
            <a href="#">
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.61437V4.83755C22 3.354 21.36 2.75427 19.77 2.75427H15.73C14.14 2.75427 13.5 3.354 13.5 4.83755V9.60385C13.5 11.0979 14.14 11.6871 15.73 11.6871H19.77C21.36 11.6977 22 11.0979 22 9.61437Z" fill="white"/>
                <path d="M22 21.4513V17.2006C22 15.5276 21.36 14.8542 19.77 14.8542H15.73C14.14 14.8542 13.5 15.5276 13.5 17.2006V21.4513C13.5 23.1242 14.14 23.7976 15.73 23.7976H19.77C21.36 23.7976 22 23.1242 22 21.4513Z" fill="white"/>
                <path d="M10.5 9.61437V4.83755C10.5 3.354 9.86 2.75427 8.27 2.75427H4.23C2.64 2.75427 2 3.354 2 4.83755V9.60385C2 11.0979 2.64 11.6871 4.23 11.6871H8.27C9.86 11.6977 10.5 11.0979 10.5 9.61437Z" fill="white"/>
                <path d="M10.5 21.4513V17.2006C10.5 15.5276 9.86 14.8542 8.27 14.8542H4.23C2.64 14.8542 2 15.5276 2 17.2006V21.4513C2 23.1242 2.64 23.7976 4.23 23.7976H8.27C9.86 23.7976 10.5 23.1242 10.5 21.4513Z" fill="white"/>
              </svg>
              <span>대시보드</span>
            </a>
          </li>

          <li>
            <a href="#">
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19.1881V11.823M11 19.1881V8.66653M3 19.1881L3 14.9795M12.4067 3.43466L17.5751 5.47392M9.79877 3.82755L4.20023 8.24548M20.0607 4.92013C20.6464 5.53648 20.6464 6.53577 20.0607 7.15211C19.4749 7.76845 18.5251 7.76845 17.9393 7.15211C17.3536 6.53577 17.3536 5.53648 17.9393 4.92013C18.5251 4.30379 19.4749 4.30379 20.0607 4.92013ZM4.06066 8.07662C4.64645 8.69296 4.64645 9.69225 4.06066 10.3086C3.47487 10.9249 2.52513 10.9249 1.93934 10.3086C1.35355 9.69225 1.35355 8.69296 1.93934 8.07662C2.52513 7.46028 3.47487 7.46028 4.06066 8.07662ZM12.0607 1.76365C12.6464 2.37999 12.6464 3.37928 12.0607 3.99562C11.4749 4.61196 10.5251 4.61196 9.93934 3.99562C9.35355 3.37928 9.35355 2.37999 9.93934 1.76365C10.5251 1.14731 11.4749 1.14731 12.0607 1.76365Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              <span>코드 편집기</span>
            </a>
          </li>
          <li>
            <a href="/files">
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.8471C13.6569 15.8471 15 14.4338 15 12.6906C15 10.9473 13.6569 9.53408 12 9.53408C10.3431 9.53408 9 10.9473 9 12.6906C9 14.4338 10.3431 15.8471 12 15.8471Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.7273 15.5601C18.6063 15.8486 18.5702 16.1686 18.6236 16.4789C18.6771 16.7892 18.8177 17.0755 19.0273 17.301L19.0818 17.3583C19.2509 17.536 19.385 17.747 19.4765 17.9792C19.568 18.2115 19.6151 18.4604 19.6151 18.7118C19.6151 18.9632 19.568 19.2121 19.4765 19.4444C19.385 19.6766 19.2509 19.8876 19.0818 20.0653C18.913 20.2431 18.7124 20.3842 18.4917 20.4805C18.271 20.5768 18.0344 20.6263 17.7955 20.6263C17.5565 20.6263 17.3199 20.5768 17.0992 20.4805C16.8785 20.3842 16.678 20.2431 16.5091 20.0653L16.4545 20.0079C16.2403 19.7874 15.9682 19.6394 15.6733 19.5832C15.3784 19.5269 15.0742 19.5649 14.8 19.6922C14.5311 19.8135 14.3018 20.0148 14.1403 20.2714C13.9788 20.5281 13.8921 20.8288 13.8909 21.1366V21.2992C13.8909 21.8065 13.6994 22.2931 13.3584 22.6519C13.0174 23.0106 12.5549 23.2122 12.0727 23.2122C11.5905 23.2122 11.1281 23.0106 10.7871 22.6519C10.4461 22.2931 10.2545 21.8065 10.2545 21.2992V21.2131C10.2475 20.8965 10.1501 20.5894 9.97501 20.3318C9.79991 20.0743 9.55521 19.8781 9.27273 19.7687C8.99853 19.6414 8.69437 19.6034 8.39947 19.6597C8.10456 19.716 7.83244 19.8639 7.61818 20.0844L7.56364 20.1418C7.39478 20.3197 7.19425 20.4608 6.97353 20.557C6.7528 20.6533 6.51621 20.7029 6.27727 20.7029C6.03834 20.7029 5.80174 20.6533 5.58102 20.557C5.36029 20.4608 5.15977 20.3197 4.99091 20.1418C4.82186 19.9641 4.68775 19.7531 4.59626 19.5209C4.50476 19.2887 4.45766 19.0397 4.45766 18.7883C4.45766 18.5369 4.50476 18.288 4.59626 18.0558C4.68775 17.8235 4.82186 17.6125 4.99091 17.4349L5.04545 17.3775C5.25503 17.152 5.39562 16.8657 5.4491 16.5554C5.50257 16.2451 5.46647 15.9251 5.34545 15.6366C5.23022 15.3537 5.03887 15.1124 4.79497 14.9425C4.55107 14.7725 4.26526 14.6813 3.97273 14.6801H3.81818C3.33597 14.6801 2.87351 14.4786 2.53253 14.1198C2.19156 13.761 2 13.2745 2 12.7671C2 12.2597 2.19156 11.7731 2.53253 11.4144C2.87351 11.0556 3.33597 10.8541 3.81818 10.8541H3.9C4.2009 10.8467 4.49273 10.7442 4.73754 10.5599C4.98236 10.3757 5.16883 10.1183 5.27273 9.82103C5.39374 9.53253 5.42984 9.21251 5.37637 8.90222C5.3229 8.59193 5.18231 8.30561 4.97273 8.08018L4.91818 8.02279C4.74913 7.84512 4.61503 7.63414 4.52353 7.4019C4.43203 7.16967 4.38493 6.92073 4.38493 6.66933C4.38493 6.41793 4.43203 6.16899 4.52353 5.93676C4.61503 5.70452 4.74913 5.49353 4.91818 5.31587C5.08704 5.138 5.28757 4.9969 5.50829 4.90063C5.72901 4.80436 5.96561 4.7548 6.20455 4.7548C6.44348 4.7548 6.68008 4.80436 6.9008 4.90063C7.12152 4.9969 7.32205 5.138 7.49091 5.31587L7.54545 5.37326C7.75971 5.59377 8.03183 5.74169 8.32674 5.79795C8.62164 5.85421 8.9258 5.81623 9.2 5.68891H9.27273C9.54161 5.56766 9.77093 5.36633 9.93245 5.10971C10.094 4.85308 10.1807 4.55237 10.1818 4.24457V4.08197C10.1818 3.5746 10.3734 3.08802 10.7144 2.72926C11.0553 2.3705 11.5178 2.16895 12 2.16895C12.4822 2.16895 12.9447 2.3705 13.2856 2.72926C13.6266 3.08802 13.8182 3.5746 13.8182 4.08197V4.16805C13.8193 4.47585 13.906 4.77656 14.0676 5.03318C14.2291 5.28981 14.4584 5.49114 14.7273 5.61239C15.0015 5.73971 15.3056 5.77769 15.6005 5.72143C15.8954 5.66517 16.1676 5.51725 16.3818 5.29674L16.4364 5.23935C16.6052 5.06148 16.8057 4.92038 17.0265 4.82411C17.2472 4.72783 17.4838 4.67828 17.7227 4.67828C17.9617 4.67828 18.1983 4.72783 18.419 4.82411C18.6397 4.92038 18.8402 5.06148 19.0091 5.23935C19.1781 5.41701 19.3122 5.628 19.4037 5.86024C19.4952 6.09247 19.5423 6.34141 19.5423 6.59281C19.5423 6.84421 19.4952 7.09315 19.4037 7.32538C19.3122 7.55762 19.1781 7.7686 19.0091 7.94627L18.9545 8.00366C18.745 8.22909 18.6044 8.51541 18.5509 8.8257C18.4974 9.13599 18.5335 9.45601 18.6545 9.74451V9.82103C18.7698 10.1039 18.9611 10.3452 19.205 10.5152C19.4489 10.6851 19.7347 10.7763 20.0273 10.7775H20.1818C20.664 10.7775 21.1265 10.9791 21.4675 11.3379C21.8084 11.6966 22 12.1832 22 12.6906C22 13.1979 21.8084 13.6845 21.4675 14.0433C21.1265 14.402 20.664 14.6036 20.1818 14.6036H20.1C19.8075 14.6048 19.5217 14.696 19.2778 14.866C19.0339 15.0359 18.8425 15.2772 18.7273 15.5601Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>컨테이너</span>
            </a>
          </li>
          <li>
            <a href="#">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.07692 9.51534C6.56712 9.51534 6.15385 9.9097 6.15385 10.3962C6.15385 10.8826 6.56712 11.277 7.07692 11.277H16.9231C17.4329 11.277 17.8462 10.8826 17.8462 10.3962C17.8462 9.9097 17.4329 9.51534 16.9231 9.51534H7.07692Z" fill="white"/>
              <path d="M7.07692 14.213C6.56712 14.213 6.15385 14.6074 6.15385 15.0938C6.15385 15.5803 6.56712 15.9746 7.07692 15.9746H16.9231C17.4329 15.9746 17.8462 15.5803 17.8462 15.0938C17.8462 14.6074 17.4329 14.213 16.9231 14.213H7.07692Z" fill="white"/>
              <path d="M13.2308 18.9107C12.721 18.9107 12.3077 19.305 12.3077 19.7915C12.3077 20.278 12.721 20.6723 13.2308 20.6723H16.9231C17.4329 20.6723 17.8462 20.278 17.8462 19.7915C17.8462 19.305 17.4329 18.9107 16.9231 18.9107H13.2308Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3424 0.979291C19.3906 0.521324 18.2855 0.3175 16.963 0.218323C15.6516 0.119988 14.0375 0.119991 12.0375 0.119995H11.9749C10.2185 0.119995 8.76181 0.119995 7.55057 0.185437C6.33442 0.251145 5.3001 0.385132 4.40319 0.680433C3.86091 0.858976 3.36971 1.09598 2.91721 1.40969C2.31642 1.8262 1.78807 2.33036 1.35157 2.90364C0.630553 3.8506 0.3077 4.9597 0.152281 6.32853C-1.78814e-05 7.66988 -9.88738e-06 9.36057 1.62876e-07 11.5174V13.9726C-9.88738e-06 16.1294 -1.78814e-05 17.8201 0.152281 19.1615C0.3077 20.5303 0.630553 21.6394 1.35157 22.5863C1.78807 23.1596 2.31642 23.6638 2.91721 24.0803C3.90961 24.7683 5.07193 25.0764 6.50643 25.2247C7.91211 25.37 9.6839 25.37 11.9442 25.37H12.0557C14.316 25.37 16.0879 25.37 17.4936 25.2247C18.9281 25.0764 20.0904 24.7683 21.0828 24.0803C21.6836 23.6638 22.2119 23.1596 22.6484 22.5863C23.3694 21.6394 23.6923 20.5303 23.8477 19.1615C24 17.8201 24 16.1295 24 13.9727V11.5174C24 9.3606 24 7.66985 23.8477 6.32853C23.6923 4.9597 23.3694 3.8506 22.6484 2.90364C22.2119 2.33036 21.6836 1.8262 21.0828 1.40969C20.8482 1.24705 20.6021 1.10426 20.3424 0.979291ZM12 1.88162C14.0452 1.88162 15.5876 1.88224 16.8183 1.97454C17.3541 2.01471 17.8136 2.07139 18.2144 2.14802C17.2073 3.09508 16.398 3.82179 15.6746 4.3654C14.7275 5.07715 14.0015 5.41654 13.2662 5.52766C12.7241 5.60959 12.1718 5.60959 11.6297 5.52766C10.8733 5.41335 10.1269 5.05754 9.13935 4.3033C8.40514 3.74257 7.58267 2.99793 6.55898 2.03261C6.88972 1.99492 7.25307 1.96596 7.65494 1.94425C8.80822 1.88194 10.2135 1.88162 12 1.88162ZM16.8168 5.74937C17.7561 5.04352 18.7971 4.08254 20.0626 2.88064C20.4799 3.17941 20.8481 3.53615 21.1549 3.9391C21.6091 4.53571 21.8739 5.29934 22.0123 6.51828C22.1526 7.75371 22.1538 9.34908 22.1538 11.5706V13.9194C22.1538 16.1409 22.1526 17.7363 22.0123 18.9717C21.8739 20.1907 21.6091 20.9543 21.1549 21.5509C20.8322 21.9746 20.4417 22.3473 19.9976 22.6551C19.3724 23.0886 18.5721 23.3412 17.2947 23.4733C16 23.6072 14.3281 23.6084 12 23.6084C9.67191 23.6084 7.99999 23.6072 6.70529 23.4733C5.42786 23.3412 4.62759 23.0886 4.00235 22.6551C3.55829 22.3473 3.16777 21.9746 2.84514 21.5509C2.39088 20.9543 2.12609 20.1907 1.98769 18.9717C1.84742 17.7363 1.84615 16.1409 1.84615 13.9194V11.5706C1.84615 9.34908 1.84742 7.75371 1.98769 6.51828C2.12609 5.29934 2.39088 4.53571 2.84514 3.9391C3.16777 3.51537 3.55829 3.14273 4.00235 2.83487C4.15384 2.72985 4.31458 2.63615 4.48838 2.55249C5.87184 3.87061 6.98948 4.91779 7.98574 5.67865C9.09838 6.5284 10.1404 7.08616 11.3409 7.2676C12.0744 7.37845 12.8216 7.37845 13.555 7.2676C14.722 7.09123 15.739 6.55935 16.8168 5.74937Z" fill="white"/>
            </svg>
              <span>게시판</span>
            </a>
            </li>
          <li>
            <a href="#">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21.1346C5.33579 18.5279 8.50702 16.9259 12 16.9259C15.493 16.9259 18.6642 18.5279 21 21.1346M16.5 7.98253C16.5 10.5975 14.4853 12.7173 12 12.7173C9.51472 12.7173 7.5 10.5975 7.5 7.98253C7.5 5.36761 9.51472 3.2478 12 3.2478C14.4853 3.2478 16.5 5.36761 16.5 7.98253Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              <span>프로필</span>
            </a>
          </li>
          
          <li>
            <a href="#">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12.1377L11 14.2421L15.5 9.50733M20 12.6638C20 17.8283 14.646 21.5845 12.698 22.7802C12.4766 22.9161 12.3659 22.9841 12.2097 23.0193C12.0884 23.0467 11.9116 23.0467 11.7903 23.0193C11.6341 22.9841 11.5234 22.9161 11.302 22.7802C9.35396 21.5845 4 17.8283 4 12.6638V7.63196C4 6.79074 4 6.37014 4.13076 6.00858C4.24627 5.68918 4.43398 5.40419 4.67766 5.17824C4.9535 4.92247 5.3278 4.77479 6.0764 4.47942L11.4382 2.36386C11.6461 2.28183 11.75 2.24082 11.857 2.22456C11.9518 2.21014 12.0482 2.21014 12.143 2.22456C12.25 2.24082 12.3539 2.28183 12.5618 2.36386L17.9236 4.47942C18.6722 4.77479 19.0465 4.92247 19.3223 5.17824C19.566 5.40419 19.7537 5.68918 19.8692 6.00858C20 6.37014 20 6.79074 20 7.63196V12.6638Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              <span>미션</span>
            </a>
          </li>
          </ul>

          <div className="dark-mode-toggle">
            <label className="ui-switch">
              <input type="checkbox" checked={darkMode} onChange={handleToggle} />
              <div className="slider">
                <div className="circle"></div>
              </div>
            </label>
            <span>Dark Mode</span> 
          </div>
          
          <div className="avatar">
            <img src="https://via.placeholder.com/40" alt="Avatar" />
            <span>홍길동 @gildong</span>
          </div>
        </div>
        <div className="main-content">
          <div className="top-bar">
            <h1>홍길동님의 대시보드입니다.</h1>
          </div>
          <div className="content-row">
            <div className="statistics">
              <h2>스택</h2>
              <p>ABCDEFG</p>
            </div>
            <div className="progress">
              <h2>미션</h2>
              <div className="progress-circle">
                <span>75%</span>
              </div>
            </div>
          </div>
          <div className="content-row">
            <div className="tasks">
              <h2>오늘할 일</h2>
              <ul>
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
              </ul>
            </div>
            <div className="calendar">
              <h2>달력</h2>
              <p>Calendar content</p>
            </div>
          </div>
          <div className="new-activities">
            <h2>게시판</h2>
            <input type="text" placeholder="Searching" className="search-bar" />
            <p>글 1</p>
            <p>글 1</p>
            <p>글 1</p>
            <p>글 1</p>
            <p>글 1</p>
            <p>글 1</p>

          </div>
        </div>
      </div>
  );
}

export default main;
