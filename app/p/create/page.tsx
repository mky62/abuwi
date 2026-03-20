"use client"

import { Button } from "@/packages/ui/button"
import { SimpleEditor } from "@/packages/tiptap/components/tiptap-templates/simple/simple-editor"


export default function Create() {

  const handlePost = () => {
    console.log("Post created");
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl flex justify-between  px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Create Post
        </h1>
        <Button
          type='submit'
          onClick={handlePost}
          className="w-24 h-9 bg-primary text-primary-foreground">Post</Button>
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <form
          className="flex flex-col gap-4 p-4">
          <input
            placeholder="Title"
            className="w-full h-12 text-lg"
          />
          <input
            placeholder="Content"
            className="w-full h-12 text-lg"
          />
        </form>
      </div>

      < SimpleEditor />


    </div>
  )
}