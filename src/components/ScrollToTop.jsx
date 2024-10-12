import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {visible && (
                <div 
                    onClick={scrollToTop} 
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        height: '40px',
                        width: '40px',
                        backgroundColor: '#1088e9',
                        color: '#fff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '40px',
                        cursor: 'pointer',
                        zIndex: 1000,
                    }}
                >
                    ↑
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
