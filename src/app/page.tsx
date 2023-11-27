import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";


export default async function Home() {
  const {userId} = await auth()
  const isAuth = !userId
  

  return (
   <div className="w-screen min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold text-slate-300">Interaja facilmente com PDFs</h1>
            <UserButton afterSignOutUrl="/" />
        </div>

        <div className="flex mt-4">
          {isAuth && (
            <Button className="bg-slate-100 text-black hover:bg-gray-400 hover:scale-105 transition-all ease-in-out duration-200">Ir para o Chat</Button>
          )}
         
        </div>

        <p className=" max-w-2xl mt-4 text-lg mt-4  text-slate-100">
             Faça parte de uma comunidade de milhões de estudantes, pesquisadores e profissionais para responder instantaneamente a perguntas e compreender pesquisas com IA.
        </p>

        <div className="w-ful mt-4">
          {isAuth ? (<h1>Upe seu Arquivo</h1>): (
            <Link href="/sign-in">
              <Button>Faça login para começar  <LogIn className="w-4 h-4 ml-2"/></Button>
            </Link>
          )}
        </div>
      </div>
    </div>
   </div>
  )
}
