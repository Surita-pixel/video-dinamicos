
function getDataById(id: string) {
    return data.find(item => item.id === id);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return new Response("ID is required", { status: 400 });
    }

    // Fetch data by ID
    const result = getDataById(id);

    if (!result) {
        return new Response("Data not found", { status: 404 });
    }

    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}

const data = [
    {
      "id": "d26542df-3d7c-40df-bab6-2dc97fdacc30",
      "status": "succeeded",
      "url": "https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/d26542df-3d7c-40df-bab6-2dc97fdacc30.mp4",
      "snapshot_url": "https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/d26542df-3d7c-40df-bab6-2dc97fdacc30-snapshot.jpg",
      "output_format": "mp4",
      "render_scale": 0.375,
      "width": 270,
      "height": 480,
      "frame_rate": 60,
      "duration": 61.083333333333336,
      "file_size": 4701208,
      "script": [
        "5 milagros impactantes documentados en la historia que desafían la ciencia y la razón",
        "en calanda españa en el siglo XVII miguel juan pellicer recuperó su pierna amputada tras implorar a la virgen del pilar un hecho examinado y certificado por notarios y médicos",
        "la tilma de guadalupe muestra una imagen de la virgen maría inexplicablemente impresa en una tela de maguey que debió desintegrarse en 20 años y lleva casi 500 intacta",
        "la sangre seca de san genaro en nápoles se licúa milagrosamente varias veces al año un fenómeno estudiado por científicos que no encuentran explicación natural",
        "cuerpos de santos como santa bernadette o santa catalina laboure permanecen incorruptos décadas y siglos después de su muerte desafiando las leyes naturales de descomposición",
        "las apariciones marianas en lourdes y fátima con miles de testigos y curaciones inexplicables siguen siendo objeto de fe y controversia pero están históricamente registradas",
        "si te fascinan estos misterios y quieres explorar más sucesos inexplicables sígueme para descubrir datos que te sorprenderán cada día",
      ],
      "imageList": [
        "https://gestion.org/wp-content/uploads/2011/06/gestion196.jpg",
        "https://profesorado.pucp.edu.pe/wp-content/uploads/2018/11/foto1-900x600-1.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI64aQxzDYgc6RHLhUHxvd909avKxUXjmuxQ&s",
        "https://gestion.org/wp-content/uploads/2011/06/gestion196.jpg",
        "https://profesorado.pucp.edu.pe/wp-content/uploads/2018/11/foto1-900x600-1.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI64aQxzDYgc6RHLhUHxvd909avKxUXjmuxQ&s",
        "https://gestion.org/wp-content/uploads/2011/06/gestion196.jpg",
        "https://profesorado.pucp.edu.pe/wp-content/uploads/2018/11/foto1-900x600-1.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI64aQxzDYgc6RHLhUHxvd909avKxUXjmuxQ&s",
        "https://gestion.org/wp-content/uploads/2011/06/gestion196.jpg",
        "https://profesorado.pucp.edu.pe/wp-content/uploads/2018/11/foto1-900x600-1.png",
  
      ],
      "audioFile": "URL_DEL_ARCHIVO_DE_AUDIO.mp3",
      "captions": [
        { start: 0, end: 5, text: "Subtítulo 1" },
        { start: 5, end: 10, text: "Subtítulo 2" },
      ],
    },
  ];
  