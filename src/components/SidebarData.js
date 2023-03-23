import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AlbumIcon from '@mui/icons-material/Album';
import ListIcon from '@mui/icons-material/List';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LoginIcon from '@mui/icons-material/Login';

export const SidebarData =[
    {
        title:'HOME',
        icon:<HomeIcon />,
        link:'/'
    },
    {
        title:'BOOK',
        icon:<MenuBookIcon />,
        link:'/book'
    },
    {
        title:'RECORD',
        icon:<AlbumIcon />,
        link:'/record'
    },
    {
        title:'TRACK',
        icon:<PlaylistPlayIcon />,
        link:'/track'
    },
    {
        title:'TODO',
        icon:<ListIcon />,
        link:'/todo'
    },
    {
        title:'MEMO',
        icon:<TextSnippetIcon />,
        link:'/memo'
    },
    {
        title:'SIGNIN/ACCOUNT',
        icon:<LoginIcon />,
        link:'/users'
    },
    
]
  
