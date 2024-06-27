import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'src', 'assets', 'model', 'gan.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const modelJSON = JSON.parse(data);

    // Opcjonalnie, zaloguj model JSON aby sprawdzić jego strukturę
    console.log('Model JSON:', modelJSON);

    // Zwróć model JSON z odpowiednimi nagłówkami
    return new NextResponse(JSON.stringify(modelJSON), {
    });
  } catch (err) {
    console.error('Błąd podczas odczytu lub parsowania pliku gan.json:', err);
    return new NextResponse(JSON.stringify({ message: 'Plik nie znaleziony lub niepoprawny JSON' }), { status: 404 });
  }
}
