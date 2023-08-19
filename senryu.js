document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("poem-form");
    const generateButton = document.getElementById("generate-button");
    const resultDiv = document.getElementById("result");
    const poemDisplay = document.getElementById("poem");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        generateButton.disabled = true; // ボタンを無効化
        
        const theme = document.getElementById("theme").value;
        const response = await generatePoem(theme);
        poemDisplay.textContent = response.choices[0].message.content;
        resultDiv.classList.remove("hidden");
        
        generateButton.disabled = false; // ボタンを有効化
    });
});

// 省略



const apiKey = "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"; // 実際のAPIキーに置き換える

async function generatePoem(theme) {
    const userText = document.getElementById("user-text").value; // テキストエリアの値を取得
    //ここのプロンプトを変更すれば出力できると思うのですが、いかがでしょうか？
    const prompt = `テーマ：${theme}\nテキスト：${userText}\n\n`; // プロンプトにテキストエリアの内容を追加
    const response = await fetch("/generate-poem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt })
    });

    return await response.json();
}



