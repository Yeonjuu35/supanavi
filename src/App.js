import React, {useState, useEffect} from 'react'
import { supabase } from './api/dbconfig'

function App() {
  const apilist = async () => {
    // supabase db접속정보를 가지고 서버에 접속
    // 데이터가 많으면 order와 limit 메서드로 끊어가지고 오기
    // select 필수, 한계점 넣어주기

  let { data: items, error } = await supabase.from('hd_yys_2').select('*').limit(50);;
    // .from('your_table_name').select('*') // 데이블을 선택하고 sql select 실행
    // 이후 변수에 구조할당함  
    // await supabase.from('navidb').select('*') 이 처리로 만들어진 결과는 object이고
    // 그 내부 안의 key이름 data와 error를 items라는 변수에 error는 error라는 변수에 저장
    // 이것이 구조할당
    // data, error라는 변수는 오타내며 안됨

    console.log(items, Array.isArray(items))

    if (error){
      console.error('Error fetching data:', error);
    } else {
      setData(items) // [] > [navidb 데이터로 채워짐]
    }
  }

  const [gnblist, setData] = useState([])
  const [gnbview, setView] = useState("글보기 내용이 없습니다.")
  const boardtype = ['list', 'view', 'modify', 'delete']; // 페이지 핸들링 변수
  const [pagestatue, pageSet] = useState(boardtype[0]); // 라우터 없이 하나의 컴포넌트에서 page 상태에 따라 노출

  // map과 연동되는 변수가 api 상태변수

  // 비동기 삭제함수 > pk 알려주기
  useEffect(()=>{
    apilist(); // 실행
    return()=>{

    }
    // 여기 개발코드 넣으면 적용 안됨
  },[])

  return (
    <div className='App'>
      {
        pagestatue === 'list' ? 
        <div className='listpage'>
          <h1>목록페이지 total : {gnblist.length}</h1>
            {
              gnblist.length > 0 ? 
              <ul>
                {
                  gnblist.map((v, i)=>{
                    return(
                      <li key = {v.gnblink}>
                        <p onClick={()=>{setView(v.gnblink); pageSet('view'); }}>{v.gnbnm}</p>
                        <button>수정</button>
                        <button>삭제</button>
                      </li>
                    )
                  })
                }
              </ul> : <div>로딩화면 제작</div>
            }
        </div>
        : pagestatue === 'view' ? 
        <div className='viewpage'>
          <h1>글보기(pk 반드시 존재)</h1>
          <div>{ gnbview }</div>
          <button onClick={()=>{pageSet('list');}}>목록</button>
        </div>
        : pagestatue === 'modify' ?
        <div className='writepage'>
          <h1>글쓰기(pk없음) & 글수정(pk 반드시 존재)</h1>
        </div>
        :
        <div className='deletepage'>
          <h1>글삭제(pk 반드시 존재)</h1>
        </div>
      }
    </div>
  )
}

export default App

