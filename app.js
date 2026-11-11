
import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://gstatic.com";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadAds() {
    const loadingElement = document.getElementById('loading-text');
    const adsContainer = document.getElementById('ads-container');
    try {
        const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (loadingElement) loadingElement.style.display = 'none';
        if (adsContainer) adsContainer.innerHTML = '';
        if (querySnapshot.empty) {
            adsContainer.innerHTML = '<p class="no-ads">لا توجد إعلانات حالياً.</p>';
            return;
        }
        querySnapshot.forEach((doc) => {
            const ad = doc.data();
            if (ad.status !== 'active') return; 
            const adCard = `
                <div class="ad-card">
                    <h3>${ad.title}</h3>
                    <p class="category">التصنيف: ${ad.category}</p>
                    <p class="price">السعر: ${ad.price} دج</p>
                </div>
            `;
            adsContainer.innerHTML += adCard;
        });
    } catch (error) {
        console.error("خطأ: ", error);
    }
}

window.addEventListener('DOMContentLoaded', loadAds);
