import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// API 요청을 위한 함수
const fetchClothingBins = async (page = 1, perPage = 10) => {
    const apiUrl = 'https://api.odcloud.kr/api/15068863/v1/uddi:d306939e-fc51-4317-9fac-e8e610a02bb4';
    const apiKey = 'wBfHCw7RF3B3JKNLEC1MCTSQtpFAiwHeXaB39vqZ9IL/6NBk/kzoYxV2aMSq6KBH97yPItiU3ouNRNEQ3Ud0sw=='; // 디코딩된 API 키

    try {
        const response = await axios.get(apiUrl, {
            params: {
                serviceKey: apiKey,
                page,
                perPage,
                // returnType: 'JSON'
            },
        });

        // 여기서 API 응답을 처리하고 필요한 데이터 형태로 변환
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        return null;
    }
};

type ClothingBin = {
    latitude: number;
    longitude: number;
    locationDescription: string;
};

function App() {
    // 상태에 타입 지정
    const [clothingBins, setClothingBins] = useState<ClothingBin[]>([]);

    useEffect(() => {
        const getClothingBins = async () => {
            const data = await fetchClothingBins();
            if (data) {
                setClothingBins(data);
            }
        };

        getClothingBins();
    }, []);

    // 서대문구의 위도와 경도
    const position = [37.579617, 126.936779];

    return (
        <div className="App">
            <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {clothingBins.map((bin, index) => (
                    <Marker key={index} position={[bin.latitude, bin.longitude]}>
                        <Popup>{bin.locationDescription}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;
