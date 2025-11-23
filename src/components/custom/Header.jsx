import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { Menu, X } from "lucide-react"

function Header() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  })

  const GetUserProfile = (tokenInfo) => {
    axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        sessionStorage.setItem('user', JSON.stringify(resp.data))
        setOpenDialog(false)
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error.response?.data || error.message)
      })
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-5 py-2 flex justify-between items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-md shadow-lg">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 cursor-pointer">
        <img src="/logo2.png" alt="Logo" className="w-9 h-9 bg-white rounded-full p-1" />
        <h2 className="font-bold text-xl text-white">Trip<span className='text-blue-400'>Master</span> AI</h2>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-10 text-md font-medium text-white md:ml-150">
        <a href="/" className="hover:text-yellow-300 transition">Home</a>
        <a href="/about" className="hover:text-yellow-300 transition">About</a>
        <a href="/create-trip" className="hover:text-yellow-300 transition">Plan Trip</a>
      </div>

      {/* Hamburger Toggle (Mobile only) */}
      <div className="md:hidden text-white">
        {menuOpen ? (
          <X className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <Menu className="cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <a href="/my-trip">
              <Button variant="outline" className="rounded-full px-5 py-1 text-white border border-white bg-transparent hover:bg-white hover:text-black transition cursor-pointer">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="h-9 w-9 rounded-full cursor-pointer border border-white"
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <h2
                  onClick={() => {
                    googleLogout()
                    sessionStorage.removeItem('user')
                    window.location.href = '/'
                  }}
                  className="cursor-pointer text-sm text-red-500"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-full px-5 py-1 text-white border border-white bg-transparent hover:bg-white hover:text-black transition cursor-pointer"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-black bg-opacity-90 p-5 flex flex-col gap-4 text-white z-50 md:hidden rounded-b-lg">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/about" className="hover:text-yellow-300 transition">About</a>
          <a href="/create-trip" className="hover:text-yellow-300 transition">Plan Trip</a>

          {user ? (
            <>
              <a href="/my-trip" className="hover:text-yellow-300 transition">My Trips</a>
              <div className="flex items-center gap-3">
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border"
                />
                <button
                  onClick={() => {
                    googleLogout()
                    sessionStorage.removeItem('user')
                    window.location.href = '/'
                  }}
                  className="text-sm text-red-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Button
              onClick={() => {
                setOpenDialog(true)
                setMenuOpen(false)
              }}
              className="text-black bg-white w-full"
            >
              Sign In
            </Button>
          )}
        </div>
      )}

      {/* Google Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogDescription>
              <img src="./logo1.png" alt="Logo" className="w-28 mx-auto mb-5" />
              <h2 className="font-bold text-lg text-center">Sign In with Google</h2>
              <p className="text-sm mb-4 text-center">Securely log in to the app using your Google account.</p>
              <Button
                onClick={login}
                className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-700 rounded-xl cursor-pointer"
              >
                <FcGoogle className="text-xl" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
