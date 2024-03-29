// /api/create-chat

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    return NextResponse.json({ message: "PDF Enviado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no Servidor" }, { status: 500 });
  }
}
