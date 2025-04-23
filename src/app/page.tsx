"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VideoPlayer from './_components/VideoPlayer';

interface DataType {
    id: string;
    status: string;
    url: string;
    snapshot_url: string;
    output_format: string;
    render_scale: number;
    width: number;
    height: number;
    frame_rate: number;
    duration: number;
    file_size: number;
    modifications: { [key: string]: any };
}

export default function VideoPage() {
    const [data, setData] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const router = useRouter();
    
    const id = 'd26542df-3d7c-40df-bab6-2dc97fdacc30';

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getJsonByid?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData: DataType = await response.json();
                setData(jsonData);
                setVideoId(jsonData.id);
                setPlayVideo(true)
                setLoading(false);
            } catch (e: any) {
                setError(e.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No data found.</div>;
    }

    return (
        <div>
            <h1>Remotion Video</h1>
            {/* Pasa los datos al componente VideoPlayer */}
            <VideoPlayer playVideo={playVideo} videoId={videoId!}/>
        </div>
    );
}