import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

import './style.css'

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the available teachers.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Subject"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Arts', label: 'Arts' },
              { value: 'Biology', label: 'Biology' },
              { value: 'Math', label: 'Math' },
              { value: 'English', label: 'English' },
              { value: 'History', label: 'History' },
              { value: 'Music', label: 'Music' },
            ]}
          />

          <Select
            value={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
            name="week_day"
            label="Day of the week"
            options={[
              { value: '0', label: 'Sunday' },
              { value: '1', label: 'Monday' },
              { value: '2', label: 'Tuesday' },
              { value: '3', label: 'Wensday' },
              { value: '4', label: 'Thrusday' },
              { value: '5', label: 'Friday' },
              { value: '6', label: 'Saturday' },
            ]}
          />

          <Input
            value={time}
            onChange={(e) => { setTime(e.target.value) }}
            type="time"
            name="time"
            label="Time"
          />

          <button type="submit">
            Search
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList;