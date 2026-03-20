"use client"

import { useState } from "react"
import { Button } from "@/packages/ui/button"
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { SimpleEditor } from "@/packages/tiptap/components/tiptap-templates/simple/simple-editor"

export default function ClientPage() {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")

  const handlePost = () => {
    console.log("Post created", { title });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans selection:bg-primary/20">
      {/* Left Sidebar - 30% */}
      <aside className="w-full md:w-[30%] border-b md:border-b-0 md:border-r border-border/40 flex flex-col h-auto md:h-screen md:sticky md:top-0 bg-background/50 backdrop-blur-md z-10">
        <div className="p-4 md:p-6 border-b border-border/40 flex items-center justify-between">
          <button className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Link href="/dashboard">
              <ArrowLeft />
            </Link>
          </button>
          <Button onClick={handlePost} className="rounded-full px-6 bg-primary text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all">
            Publish
          </Button>
        </div>

        <div className="p-4 md:p-8 flex-1 overflow-y-auto flex flex-col justify-center min-h-[30vh]">
          <div className="p-4 md:p-8 flex-1 overflow-y-auto flex flex-col justify-center min-h-[30vh]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Title..."
              className="w-full bg-transparent text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground placeholder:text-muted-foreground/30 border-none focus:outline-none focus:ring-0 leading-tight"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
      </aside>

      {/* Right Content Area - 70% */}
      <main className="flex-1 w-full md:w-[70%] h-screen overflow-hidden flex flex-col bg-background relative animate-in fade-in slide-in-from-right-4 duration-700 ease-out">
        <div className="w-full h-full flex-1 flex flex-col px-4 md:px-8 lg:px-12 pt-8 pb-12">
          <SimpleEditor />
        </div>
      </main>
    </div>
  )
}
