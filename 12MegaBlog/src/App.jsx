import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Editor } from '@tinymce/tinymce-react';

import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        <Editor
      apiKey='xl3mo9xwndeblug0voklqxdb1s0q5wo07hyj0opj1kzxrdob'
      // init={{
      //   plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      //   toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      //   tinycomments_mode: 'embedded',
      //   tinycomments_author: 'Author name',
      //   mergetags_list: [
      //     { value: 'First.Name', title: 'First Name' },
      //     { value: 'Email', title: 'Email' },
      //   ],
      //   ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      // }}
      //initialValue="Welcome to TinyMCE!"
    />
        </main>
        <Footer />
      </div>
    </div>
    
  ) : null
}

export default App