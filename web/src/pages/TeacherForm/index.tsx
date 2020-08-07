import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import Input from '../../components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'

import './style.css'

const TeacherForm = () => {

  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ])

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems

    }).then(() => {
      alert('Inscription fulfilled');
      history.push('/');

    }).catch(() => {
      alert('Oops!');
    })
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position)
        return { ...scheduleItem, [field]: value };

      return scheduleItem;
    })

    setScheduleItems(updatedScheduleItem);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Awesome! You want to give classes"
        description="The first step is to fill in this form"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your Data</legend>
            <Input
              name="name"
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>
            <Select
              name="subject"
              label="Subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Biology', label: 'Biology' },
                { value: 'Math', label: 'Math' },
                { value: 'English', label: 'English' },
                { value: 'History', label: 'History' },
                { value: 'French', label: 'French' },
              ]}
            />
            <Input
              name="cost"
              label="Cost per hour"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>Time Available
              <button type="button" onClick={addNewScheduleItem}>
                + New time
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (

              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Day of the week"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                  name="from"
                  label="From"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input
                  name="to"
                  label="To"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>

            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Importat warning" />
              Important:<br />
                Fill in all data
              </p>
            <button type="submit">Save</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;