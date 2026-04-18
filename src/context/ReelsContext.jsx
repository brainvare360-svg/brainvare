import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const WORKER_URL = 'https://brainvare-r2-uploader.brainvare.workers.dev';
const R2_AUTH_HEADER = { 'Authorization': `Bearer ${import.meta.env.VITE_R2_API_SECRET}` };

// Default reels data (matches the original hardcoded list)
const defaultReelsData = [
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQM-TQMYNZxDCym8Q6rwKfYYEe7AGmKR5O_cECM-uhTi7xKJXQjeSZhcdUIyBf-MjsKb8UGkA0aJdszPIdRYjOfEtZ596lOUrDPOQxk.mp4", instagram: "https://www.instagram.com/p/DLnFFc5z4xZ/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMEYeZv9xI4ith-CuBlcQxJKu487u1slkuPYouUEeAnFTeM7FdKAh470ZbDvs4WgvFy9xRW3la-Bh1OYwygRSwa5Bc_G3sZHnsvOxY.mp4", instagram: "https://www.instagram.com/p/DLe5VTJvLaq/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMJMM3yFtaf7d2gr3GeUrXiV8aLsUtOA27HXhotEqwLRCaLIqiULIADnEs2axIibAGFqBURGfGeZVuXI8QjKgNuKEC3xBnXA0dCTMI.mp4", instagram: "https://www.instagram.com/p/DLaNf1BvGqP/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMVA4kbzQkkR-Z-3_PnmSYZ9RYib_30BWQ-fS_n3jMiLWmTSlYRUm3gkDxXyYr8eLHYfrYgAYDeGc7qAaiHgz29cvTEwND10f8Btkg.mp4", instagram: "https://www.instagram.com/p/DK9-S5YvWVH/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMmTeKweOCmUP9_rHn0kke82AfHFz_ZgzVGkIWfPFUurQ-I4h793O1zHx_yvtVuxd8cQj-fal4Sl6_lKn6jjlIWxIhOR8Dp9sgwO5U.mp4", instagram: "https://www.instagram.com/p/DKkS_-lPTYR/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQN7GcYO-X9EjwEbHSFBL3IEw9Q4U42OnPfk_q8GLCfTj6w-XhEFvuvugf0FkT90uBeVGAUHszHXWq3fh3oNx19W.mp4", instagram: "https://www.instagram.com/p/DImDiiVv9kg/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNMGd2HM2ND0miBwcm5P8YCKpAOV42teJo0VCkgKHwxiXXT25sNd6atzD-GsU4ATiNG1LpTyAlIYHO5sk3S9td8qidu6KK2C3F8R60.mp4", instagram: "https://www.instagram.com/p/DT4-Sm8jzJe/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNYQfFYGNoH0XXntYQe3mVuSLrRmhFqow_RKLInwgyVlWA4IeUCf22XselVFVJ0Ird2yzLRR7sHrKdc7GcTLAmRpiN4XI-iKFNqcVQ.mp4", instagram: "https://www.instagram.com/p/DTw6_rMj9EU/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNbVbbUuoj82UIxZ99I9GrIu9wuBeLxp1E8zI_LbCEfjCNJ5Wx_hAoFnj7x2KwWWJPU_hTLijI62kymN5-l-Ryu.mp4", instagram: "https://www.instagram.com/p/DTu8BtnjIYX/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNhTJVw7Oa4kxbwAt4erjcsKl7mnKtKVRd3D6fm-BUQEAZysFAk8bARF7YDNu6NOeq35t15-f8pBfKnfGrgHXu9gRYKl9qr0HzMiAw.mp4", instagram: "https://www.instagram.com/reel/DTr4Dikj8lB/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNju8etOo53-aW2d-hwoRhA-0fFaE_Clfq6quHJ2gHEotAWg6so-2K36okIHKbDgBiLUApMB766kDVbW7OeHxiaF4FR94nWa8SlpRE.mp4", instagram: "https://www.instagram.com/reel/DTsE2BYj2KT/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQNzDzkMOhG9in-GFLIq6F2QjexwYuJD6MWfOsPr4OmiNnGYx6SvrWVxqx00IdLJ-TLRR3bGtq-OXN8auTL7MNbBJz-cmcTf3kFmKDQ.mp4", instagram: "https://www.instagram.com/reel/DSzsJvMj9ej/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQO0J3DAZ9QTlZAXCOKmVW69Ndw5x4Ia1b4dj1IsKxlY0fcuiHPBR1NvFnXF_HWMqEn6K1xoT3bQdS-xWoiXTvf6jWmL-RFbzMGUChc.mp4", instagram: "https://www.instagram.com/reel/DSzt0s_j3sT/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQO1WiEm0mzpwZMsdOdq2o-Tyc5ccN-TJQNpvNoOoIn8EhtTqUVrmAb2iJ9SKhkFV3t9ihAXtXm5slEtinJkMcuvFJGQflZxn03X1i8.mp4", instagram: "https://www.instagram.com/reel/DS4YYd1Dz6N/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQO9VTD9G_fLkC3NtebmTLWp2_Wl2GYGPajzI8fcApp74zyWHzZhKchp2IoRQoangcbW-CMbiXdMwYerQXaFXlRz2Er93hA4XEbp_VQ.mp4", instagram: "https://www.instagram.com/reel/DS4z5_EDKPt/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQODjh_YGlwSdcBzTIjskRWdVE2Pka9v9Fw0N3CuZBBELJYy3KcwWa6dn8bkpKjpwdfLss0YNTd68wgKByAzNhgTQRNbGHR0gwY8Cso.mp4", instagram: "https://www.instagram.com/reel/DS5HYm5ioEN/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQOGfOtPUN0RMYTehE1FFbZjUeAnyfet0RWqgC9dDRaSwcg335xuIPP_MjHlaq4d5xAM2pMPH9-SOUCwtfS4-ZEVCzA9iF5ZpDt6G5U.mp4", instagram: "https://www.instagram.com/reel/DS6ti6QDUy7/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQOLwznnIcAfZ8wv2Mpvzqn4K6j-pBQseJrXf-txvQWjPMbFIAUtAd8HiQWM45sVzIBy9-afaJSWYZ-0FX_Jgp2Py8cEnF6IMFkXpuI.mp4", instagram: "https://www.instagram.com/reel/DS60FFVkZ4_/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQOVNVMz6qO2ZemtSzh-ItXhAO10h18y13UyAUAFg4c6qphVq3rWXng3ZMtnkXY2Hq6ENnY_qZ3dBH5GJfiSNwfMONnKzJVGWbI80T4.mp4", instagram: "https://www.instagram.com/reel/DS6-_ykkzsh/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQOfdgos8T0r40jBrjpyTIVLSbxPdkINpHl2BnViAdBk7bS1H9J5n5z4-yIAH30a-WwhDlIOgjvGWvt5CU6PfIvPDZcj54rN3jvLc-8.mp4", instagram: "https://www.instagram.com/reel/DS__bh4gaYF/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPC31kGQRlovUS4OjSZlK9OKR3s5C3PFYSaXtDQOjF2Gs3VFgaC_jKg2MYvV4vUKr35FZkLsXvBA2N58I0CCAO4pNx1UimS7pcRZBY.mp4", instagram: "https://www.instagram.com/reel/DTAH7NfCY_i/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPD0g3gl-_VzLJ3MvzAzS779RyujlveLkZ8SK0gfdfbfgGxDmInDk8TjKnbqtEv2_wWRB-WhowMBSvWSm7MpzuK.mp4", instagram: "https://www.instagram.com/reel/DTCj8jnDPAS/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPGlRGlwUnkHxXQRjjB_Q_RCpVGAQbHn-C4DZsds-BkepYemR_CghWIVXmgoXEReDTqTIcwYWOugCe3A3AwMHxb4TtABIQbso3UgsA.mp4", instagram: "https://www.instagram.com/reel/DTFONI4DwYw/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPTr-NZ2_HwOyyo4mfW6DWlzlQJG7kt2rIwjT95w3gxgCae7GD3GmG9amCqc4w-DbBRvj3h4_7wb5G0A4MwZsd4zltXAGkG2XOgPpw.mp4", instagram: "https://www.instagram.com/reel/DK4d7xlTkSV/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPVblRJAAhMyFqNjvnbKrO3bJp8x86wq_MmsJuZ8JOFBp4KSusGMeS9r0Wky7IH6ZfEn46YehUfY3gpH0aO9BQ-3GFswPEafKws100.mp4", instagram: "https://www.instagram.com/reel/DLRdioxzxRa/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPalPT-QO-r3zO2s7zeQad1mQhKpgyf-U7m3I940HeYGLPDB4PHhuKa_kt-w3L19XfBPZjjnDiGaKEPSUxWVACo0-QEAErM2BZA7WY.mp4", instagram: "https://www.instagram.com/reel/DOtCHcjk34_/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPbOMr7I6kCPhaL68cLv_bnmnLZ-bRKH3uQ3vDwnRmyAlkgHjcVlMewvjV2p_oLDecypUtuItoZAdfrOM-r8PiD.mp4", instagram: "https://www.instagram.com/reel/DM21IHATh0v/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPbe-jng865FdSc2rvg05TmUbbzgVFv4stblF6wRchNttHYOQZijzhDEOnaLjuPpUBGxKNEb7_ZUH5TBaYz05K5eObTgLu1gKmF1F8.mp4", instagram: "https://www.instagram.com/reel/DPJqO5Mk_YL/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPdakxGmfqpBnkknactZuzIHslta5jRIlOOvYeBqrJxDMdhVdl_tNtK4yuUHqGMWBxKQZymtGOV8-KXmAryoX3OF1GPu3D08MkY60M.mp4", instagram: "https://www.instagram.com/reel/DPOfVLrk-Ga/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPfT4WBSnfngtkY_zQFRaQYbSwP2fHqvkuOrr9ZKpnXTWUFEPh5QFKDZt9iCGGVeau9L57d4mNiSC7r9ph1n21ESKoq35TvbL3QO6g.mp4", instagram: "https://www.instagram.com/p/DTMVu0Wguq5/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPhqTB84mkEX5kPIBz-y6-bDjWxTYmUKjIWgDOdTWhDJ3fPMjNlygt-jBBFqprBVmz1SZhaxbwGp9wyLQrr3kFFyVlvOf2pQa4HcFE.mp4", instagram: "https://www.instagram.com/p/DSdk5pVDFRa/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQPp4Zp1ycR7h3Egy4gF5Hhw6-IgNVxRAIqnwW_RqGwMaNCG3lu25J6B2Yy6PGRJuBm8Tm4fgKYfwPVyDE8TgmCywqPLHEdaqYbLjb8.mp4", instagram: "https://www.instagram.com/p/DPmJUxnAUuq/" },
];

const ReelsContext = createContext();

export const useReels = () => {
    const context = useContext(ReelsContext);
    if (!context) {
        throw new Error('useReels must be used within a ReelsProvider');
    }
    return context;
};

export const ReelsProvider = ({ children }) => {
    const [reelsData, setReelsData] = useState(defaultReelsData);
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    // Load from R2 Worker on mount
    useEffect(() => {
        const loadReels = async () => {
            try {
                // First load from localStorage for instant display
                try {
                    const saved = localStorage.getItem('brainvare_reels');
                    if (saved) {
                        setReelsData(JSON.parse(saved));
                    }
                } catch (e) { }

                // Then fetch from R2 (the cloud source of truth)
                const res = await fetch(`${WORKER_URL}/reels`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                        setReelsData(data.items);
                        localStorage.setItem('brainvare_reels', JSON.stringify(data.items));
                    } else if (!localStorage.getItem('brainvare_reels')) {
                        // R2 is empty and no localStorage — seed it with defaults
                        await fetch(`${WORKER_URL}/reels`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', ...R2_AUTH_HEADER },
                            body: JSON.stringify({ items: defaultReelsData }),
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to load reels from R2:", error);
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };
        loadReels();
    }, []);

    // Persist to R2 whenever reelsData changes (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;

        // Immediately backup to localStorage
        try {
            localStorage.setItem('brainvare_reels', JSON.stringify(reelsData));
        } catch (e) {
            console.error("Failed to backup to localStorage:", e);
        }

        // Debounced save to R2
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`${WORKER_URL}/reels`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', ...R2_AUTH_HEADER },
                    body: JSON.stringify({ items: reelsData }),
                });
                if (res.ok) {
                    console.log(`✅ Auto-saved ${reelsData.length} reels to R2`);
                } else {
                    console.error("❌ Failed to save:", await res.text());
                }
            } catch (error) {
                console.error("❌ Failed to save reels to R2:", error);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [reelsData]);

    const updateReelLink = (index, instagram) => {
        setReelsData(prev => prev.map((reel, i) =>
            i === index ? { ...reel, instagram } : reel
        ));
    };

    const addReel = (videoUrl, instagramLink = '') => {
        setReelsData(prev => [...prev, { video: videoUrl, instagram: instagramLink }]);
    };

    const removeReel = (index) => {
        setReelsData(prev => prev.filter((_, i) => i !== index));
    };

    const updateAllReels = (newData) => {
        setReelsData(newData);
    };

    const resetReels = async () => {
        if (window.confirm('Reset all reel links to defaults? This cannot be undone.')) {
            setReelsData(defaultReelsData);
            try {
                await fetch(`${WORKER_URL}/reels`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', ...R2_AUTH_HEADER },
                    body: JSON.stringify({ items: defaultReelsData }),
                });
            } catch (e) {
                console.error("Failed to reset reels in R2:", e);
            }
        }
    };

    return (
        <ReelsContext.Provider value={{
            reelsData,
            loading,
            updateReelLink,
            addReel,
            removeReel,
            updateAllReels,
            resetReels
        }}>
            {children}
        </ReelsContext.Provider>
    );
};
