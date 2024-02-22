// import React from 'react'
// import {
//   FaAlignCenter,
//   FaAlignLeft,
//   FaAlignRight,
//   FaExternalLinkAlt,
//   FaHighlighter,
//   FaLink,
// } from 'react-icons/fa'
// import { IoMdList } from 'react-icons/io'
// import { MdEmojiPeople } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  title: 'Model Specs',
  name: 'modelSpecs',
  type: 'array',
  of: [
    {
      type: 'modelSpecContent',
    },
  ],
  // initialValue: [
  //   {
  //     specName: {
  //       _type: "reference",
  //       _ref: "1ff46130-de5e-4238-a1b3-d665e23a216a"
  //     },
  //     specValue: "4567"
  //   }
  // ]
})
