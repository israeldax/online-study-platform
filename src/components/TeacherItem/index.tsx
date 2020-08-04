import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './style.css'

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/12749258?s=460&u=ef18ba2f622fedccf82c2b39d952124a468d7c36&v=4" alt="" />
        <div>
          <strong>IsraelDax</strong>
          <span>Music</span>
        </div>
      </header>

      <p>
        Music lover and teacher
            <br />
        <br />
        As a private music teacher you'll combine your musical and teaching ability to provide music lessons to teach pupils to play a musical instrument or to sing.
          </p>

      <footer>
        <p>
          Price/Hour
              <strong>US$ 40,00</strong>
          <button type="button">
            <img src={whatsappIcon} alt="whatsapp" />
                Contact
              </button>
        </p>
      </footer>
    </article>
  )
}

export default TeacherItem;
