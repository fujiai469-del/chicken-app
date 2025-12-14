const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 写真が入っているフォルダ
const directory = './photos';
// リネーム後の保存先
const targetDirectory = './public/images';

// 保存先フォルダがなければ作る
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
}

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    // 1. 画像ファイルだけ選ぶ（.HEICも.jpgもOK）
    // 2. 「コピー」という名前がついた重複ファイルは無視する
    const images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.heic'].includes(ext) && !file.includes('コピー');
    });

    // 撮影日時順に並び替え
    images.sort((a, b) => {
        return fs.statSync(path.join(directory, a)).birthtime - fs.statSync(path.join(directory, b)).birthtime;
    });

    console.log(`📸 ${images.length}枚の写真を検出しました。変換＆リネームを開始します...`);

    images.forEach((file, index) => {
        const oldPath = path.join(directory, file);
        // 新しい名前（1.jpg, 2.jpg...）
        const newName = `${index + 1}.jpg`;
        const newPath = path.join(targetDirectory, newName);

        try {
            // Macの便利コマンド「sips」を使って、HEICだろうが何だろうが「jpg」に変換して保存！
            execSync(`sips -s format jpeg "${oldPath}" --out "${newPath}"`, { stdio: 'ignore' });
            console.log(`✅ [${index + 1}/${images.length}] ${file} -> ${newName} に変換完了`);
        } catch (e) {
            console.error(`❌ ${file} の変換に失敗しました`);
        }
    });

    console.log('🎉 全て完了！アプリで確認してみてください。');
});