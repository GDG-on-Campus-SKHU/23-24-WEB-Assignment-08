/**
 * You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.
 *
 * 1. [title]: Think of the diary title after understanding the [events] separated by "''" at the bottom.
 * 2. [summarize]: Summarize [events] in order with a one-line sentence.
 * 3. [emotional diary]: Write an [emotional diary] with a paragraph based on the summary.
 * 4. [evaluates]: The written emotional [evaluates], explore the unconscious based on the contents of the [emotional diary].
 * 5. [Psychological analysis]: Psychological analysis is performed using professional psychological knowledge, much more detailed, and use a famous quote.
 * 6. [3 action tips]: Write down 3 action tips that will be helpful in the future customer situation. The three action tips must be converted into JSON Array format.
 * 7. [image]: Create an image by making the contents so far into one keyword.
 *
 * Translate into Korean and Use the output in the following JSON format:
 * {
 *     title: here is [title].
 *     thumbnail: here is [image].
 *     summary: here is [summarize].
 *     emotional_content: here is [emotional diary].
 *     emotional_result: here is [evaluates].
 *     analysis: here is [Psychological analysis].
 *     action_list: here is [3 action tips].
 * }
 * [events]
 * "'''"
코딩 강의를 들었다. 
프로젝트에 버그가 많이 나왔음. 
스택오버플로에서 검색했지만 해결 안 되었어. 
역시 gpt를 통해서 해결했다. 
근데 이렇게 해결하는게 개발실력에 도움 될까,,?

 * "''"
 */

export const CallGPT = async ({ prompt }: { prompt: string }) => {
    const messages = [
      {
        role: "system",
        content: `##INFO##
      You can add images to the reply by URL. Write the image in the JSON field. 
      Use the Unsplash API (https://source.unsplash.com/1600x900/?) with tags describing the image. ##DO NOT RESPOND TO INFO BLOCK##
      `,
      },
      {
        role: "system",
        content: `You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.`,
      },
      {
        role:"user",
        content: `1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
        2. [summarize] : summarize events in order with one line sentence.
        3. [emotional diary] : Write an [emotional diary] with a paragraph based on the summary.
        4. [evaluates] : The written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
        6. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed anduse a famous quote.
        7. [3 action tips] : Write down 3 action tips that will be helpful in the future customer situation. The three action tips must beconverted into JSON Array format.
        8. [image] : Create an image by making the contents so far into one keyword.
        
        
        Translate into Korean and Use the output in the following JSON format:
        { 
            title: here is [title],
            thumbnail: here is [image],
            summary: here is [summarize]
            emotional_content: here is [emotional diary],
            emotional_result: here is [evaluates],
            analysis: here is [Psychological analysis],
            action_list: here is [3 action tips],
        }
        
        [events]:`
      }
      {
        role: "user",
        content: `1. [title] : Think of the diary title after understanding the [events] separated by 
          ${prompt}
          "''"`,
      },
    ];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 1_000,
      }),
    });
    const responseData = await response.json();
    console.log(">>responseData", responseData);
    const message = responseData.choices[0].message.content;
    return message;
  };
