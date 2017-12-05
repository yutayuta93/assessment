(function () {
    const input = document.getElementById('input');
    const button = document.getElementById('button');
    const resultArea = document.getElementById('result-area');
    const tweetArea = document.getElementById('tweet-area');
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} username ユーザーの名前
     * @returns {string} 診断結果
     */
    function asses(username){
        //TODO 診断処理を実装する

        // 1.引数からHashCodeを求める
        //JSにはHashCodeが設定されていないので、文字列の各文字のByte値の合計値を擬似的なHashCodeとする
        let totalNum = 0;
        for(let i = 0; i<username.length;i++){
            totalNum += username.charCodeAt(i);
        }
        //2.擬似的なHashCodeをanser.lengthで割ったあまりの数(残余値)を求め、それを元に診断結果を出力する
        const resultNum = totalNum % answers.length;  //resultNumの値は0-answers.length-1
        let resultStr = answers[resultNum];
        resultStr = resultStr.replace(/\{userName\}/g, username);

        return resultStr;
    }

    /**
     * 指定してHTML要素の持つ子要素をすべて削除する関数
     * @param {HTMLElement} element 子要素を削除したいHTML要素
     * 
     */
    function removeAllChildren(element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
    //ボタンの処理：ボタンのインスタンスを取得し、変数button.onClickに処理を担当する関数を代入する
    button.onclick = function(){
        //入力テキストを受け取る
        const inputText = input.value;
        if(inputText.length === 0){
            return; //onClickの処理から抜ける
        }
        
        //診断結果エリアの作成
        removeAllChildren(resultArea);
        const header = document.createElement('h3');
        header.innerText = '診断結果';

        const result = document.createElement('p');
        const resultText = asses(inputText);
        result.innerText = resultText;

        resultArea.appendChild(header);
        resultArea.appendChild(result);

        //Tweetエリアの作成
        removeAllChildren(tweetArea);
        //a要素を作成する
        const anchor = document.createElement('a');

        let hrefValue = "https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text=hoge";
        const resultURI = encodeURIComponent(resultText);
        hrefValue = hrefValue.replace('hoge',resultURI);
        anchor.setAttribute('href',hrefValue);
        anchor.className = "twitter-hashtag-button";
        anchor.innerText = '結果をつぶやこう';
        //作成したa要素をtweetAreaに代入する
        tweetArea.appendChild(anchor);
        twttr.widgets.load();


    }

    input.onkeydown = function(event){
        if(event.keyCode === 13){
            button.onclick();
        }
    }

})();
