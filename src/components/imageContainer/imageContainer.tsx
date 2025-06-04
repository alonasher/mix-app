import "./imageContainer.css";
import { useEffect, useState } from 'react';

interface ImageContainerProps {
    className?: string;
    item: {
        name: string;
        url: string;
        pictures?: {
            large: string;

        };
    } | null;
}

const ImageContainer = (props: ImageContainerProps) => {
    const { className, item } = props;
    const [showPlayer, setShowPlayer] = useState(false);
    const [coverUrl, setCoverUrl] = useState(item?.pictures?.large || '');
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (item && item.pictures?.large && coverUrl !== item.pictures.large) {
            setShowPlayer(false);
            setIsFadingOut(true);
        } else if (item && item.pictures?.large && coverUrl === '') {
            setCoverUrl(item.pictures.large);
            setIsFadingOut(false);
        }
    }, [item]);

    useEffect(() => {
        let fadeOutTimeout: NodeJS.Timeout | null = null;

        if (isFadingOut) {
            fadeOutTimeout = setTimeout(() => {
                setCoverUrl(item?.pictures?.large || '');
                setIsFadingOut(false);
            }, 500);
        }

        return () => {
            if (fadeOutTimeout) {
                clearTimeout(fadeOutTimeout);
            }
        };
    }, [isFadingOut, item]);


    const imageClassName = `album-cover ${isFadingOut ? 'fade-out' : ''}`;

    return (
        <>
            {item && (
                <div className={`${className} image-container`}>
                    <img
                        className={imageClassName}
                        src={coverUrl}
                        alt={item?.name || 'Selected Item'}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                        onClick={() => setShowPlayer(!showPlayer)}
                    />
                    <div className="iframe-container">{showPlayer && (
                        <iframe
                            title="Mixcloud Player"
                            width="100%"
                            height="120"
                            src={`https://www.mixcloud.com/widget/iframe/?feed=${item?.url}&hide_cover=1&light=1`}
                            allow="encrypted-media *; autoplay *;"
                        ></iframe>
                    )}</div>

                </div>
            )}
        </>
    );
};

export default ImageContainer;