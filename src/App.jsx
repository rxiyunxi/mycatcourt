import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Scale,
  Sparkles,
  MessageCircleHeart,
  Languages,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";

const judges = [
  {
    id: "gentle",
    name: { zh: "棉花糖法官", en: "Marshmallow Judge" },
    title: { zh: "温柔但清醒", en: "Gentle but clear-headed" },
    emoji: "🐱",
    accent: "from-pink-300 via-rose-200 to-white",
    note: {
      zh: "会先接住情绪，再指出问题核心。",
      en: "First holds the emotion, then points to the real issue.",
    },
  },
  {
    id: "sharp",
    name: { zh: "白手套法官", en: "White Glove Judge" },
    title: { zh: "一针见血", en: "Sharp and direct" },
    emoji: "😼",
    accent: "from-rose-300 via-pink-200 to-white",
    note: {
      zh: "不绕弯子，专抓沟通漏洞。",
      en: "Doesn't go in circles. Spots communication gaps fast.",
    },
  },
  {
    id: "cool",
    name: { zh: "冷静法官", en: "Calm Judge" },
    title: { zh: "逻辑派", en: "Logic-first" },
    emoji: "🐈",
    accent: "from-fuchsia-200 via-pink-100 to-white",
    note: {
      zh: "会拆开事实、情绪和责任。",
      en: "Breaks things into facts, feelings, and responsibility.",
    },
  },
  {
    id: "chaotic",
    name: { zh: "吐槽法官", en: "Snarky Judge" },
    title: { zh: "会说人话", en: "Says it like it is" },
    emoji: "🙀",
    accent: "from-pink-200 via-rose-100 to-white",
    note: {
      zh: "有点吐槽，但结论很实用。",
      en: "A little snarky, but still practical.",
    },
  },
];

const starterCases = [
  {
    zh: "对方总说忙，但半夜频繁回别人消息，也不提前说明。",
    en: "They keep saying they are busy, but reply to other people late at night without explaining.",
  },
  {
    zh: "约好一起看剧，结果对方临时被工作打断，我觉得自己总被排在后面。",
    en: "We planned to watch something together, but work interrupted at the last minute and I felt pushed aside again.",
  },
  {
    zh: "我不介意对方处理工作，但介意他没有告诉我到底发生了什么。",
    en: "I don't mind them handling work. I mind not being told what is actually going on.",
  },
];

const icebreakers = {
  zh: [
    "一起各自说一件：其实我这次最委屈的点是什么。",
    "今晚互发一条三句话消息：我理解你什么、我希望你怎么做、我愿意怎么改。",
    "一起选一个20分钟的小活动，比如散步、看一集轻松的剧，期间先不翻旧账。",
    "互相说一个最近被对方照顾到的小瞬间，让气氛先软下来。",
    "约定一个下次遇到突发情况时的固定说法，比如‘我现在要先处理工作，xx点回来找你’。",
  ],
  en: [
    "Each of you says one thing: what actually hurt me most in this situation.",
    "Send each other a three-sentence message: what I understand, what I hope for, what I can improve.",
    "Do one tiny 20-minute activity together, like a walk or one light episode, without reopening the whole fight.",
    "Tell each other one recent moment when you felt cared for by the other person.",
    "Create one default sentence for future conflict, like: I need to handle work first, I’ll come back at __.",
  ],
};

const relationshipTips = {
  zh: [
    "临时变动可以发生，但要及时同步，不要让对方靠猜。",
    "情绪先被接住，问题才更容易被解决。",
    "比起争对错，更重要的是建立可重复执行的沟通习惯。",
  ],
  en: [
    "Unexpected changes are okay, but they should be communicated early.",
    "Emotions need to be acknowledged before problems can be solved well.",
    "Long-term stability comes more from repeatable habits than from winning one argument.",
  ],
};

const copy = {
  zh: {
    appName: "小猫法庭",
    subtitle: "可爱，但不敷衍。专门审理让人心梗的关系案件。",
    sampleHeader: "快速示例",
    submitCase: "提交案件",
    placeholder:
      "把你的案件写在这里。比如：约好一起看剧，但对方半夜一直回消息，又不告诉我是在处理工作还是在和谁聊天……",
    analyze: "开始审理",
    clear: "清空案件",
    todayJudge: "今日出庭法官",
    verdictTitle: "审理结果",
    waiting: "等待开庭",
    waitingDesc: "先把案件写清楚。小猫法官会帮你拆开事实、情绪和边界问题，不走空话路线。",
    core: "问题核心",
    facts: "事实层面",
    emotion: "情绪层面",
    boundary: "边界判断",
    yours: "给你的建议",
    theirs: "给对方的建议",
    fairness: "谁更占理",
    youSide: "你",
    otherSide: "对方",
    icebreaker: "和好破冰小事",
    redraw: "重新抽一个",
    longterm: "长期关系建议",
    language: "EN",
  },
  en: {
    appName: "Cat Court",
    subtitle: "Cute, but not vague. A tiny court for messy relationship cases.",
    sampleHeader: "Quick examples",
    submitCase: "Submit a case",
    placeholder:
      "Write your case here. For example: we planned to watch something together, but they kept replying to messages late at night and never explained whether it was work or someone else…",
    analyze: "Start review",
    clear: "Clear",
    todayJudge: "Judge on duty",
    verdictTitle: "Case review",
    waiting: "Waiting for court",
    waitingDesc: "Write the case first. The cat judge will break it down into facts, emotions, and boundaries without giving empty advice.",
    core: "Core issue",
    facts: "Facts",
    emotion: "Emotions",
    boundary: "Boundary check",
    yours: "Advice for you",
    theirs: "Advice for them",
    fairness: "Who has the stronger case",
    youSide: "You",
    otherSide: "Them",
    icebreaker: "Tiny peace offering",
    redraw: "Draw another",
    longterm: "Long-term tip",
    language: "中",
  },
};

function analyzeCase(text) {
  const normalized = text.trim();
  if (!normalized) return null;

  const hasOvertime = /(工作|加班|开会|老板|同事|公司|交接|work|overtime|boss|meeting|coworker|office)/i.test(normalized);
  const hasMessage = /(消息|回消息|聊天|微信|短信|发消息|message|text|reply|chat)/i.test(normalized);
  const hasLateNight = /(半夜|凌晨|很晚|两点|夜里|late|midnight|2am|night)/i.test(normalized);
  const hasPlanBreak = /(临时|放鸽子|没做到|改时间|没兑现|失约|cancel|reschedule|changed plans|last minute)/i.test(normalized);
  const hasEmotion = /(生气|难过|委屈|失望|不开心|崩溃|烦|angry|upset|hurt|disappointed|sad)/i.test(normalized);
  const hasTrust = /(信任|边界|透明|安全感|隐瞒|不说|trust|boundary|transparent|safety|hide)/i.test(normalized);

  let yourScore = 63;
  let otherScore = 37;

  let zh = {
    core: "这件事表面上像是时间安排冲突，核心其实是沟通质量不够。",
    fact: "你们原本有共同安排，但中途出现了新的事务，导致陪伴被打断。",
    emotion: "你不一定是在争这几十分钟，而是在意自己是不是被好好说明、被放在心上。",
    boundary: "边界问题不一定是不能回消息，而是回什么、为什么回、需不需要提前交代。",
    adviceForYou: "表达不满时，尽量把重点放在‘我需要被说明’而不是‘你不能做这件事’。",
    adviceForThem: "如果对方临时要处理事情，应该明确说明对象、原因、预计时长，而不是让你一直等。",
    verdict: "问题不在忙，而在没有把你从‘被动等的人’变成‘被同步的人’。",
  };

  let en = {
    core: "This looks like a scheduling conflict on the surface, but the deeper issue is weak communication quality.",
    fact: "You had time planned together, but a new task interrupted the connection.",
    emotion: "You are not only upset about the lost time, but about whether you were clearly informed and emotionally considered.",
    boundary: "The boundary issue is not whether messages can be answered, but whether the reason and timing are communicated.",
    adviceForYou: "When you bring this up, focus on 'I need clarity and updates' rather than 'you are not allowed to do this.'",
    adviceForThem: "If they need to handle something suddenly, they should explain the reason and expected timing instead of making you wait in uncertainty.",
    verdict: "The problem is not being busy. The problem is leaving you as the passive person who waits instead of the person who is kept in the loop.",
  };

  if (hasOvertime && hasMessage) {
    yourScore = 72;
    otherScore = 28;
    zh.core = "问题核心不是工作本身，而是工作侵入你们相处时间时，对方没有给出足够透明的说明。";
    zh.fact = "原本说好的相处安排，被临时工作与沟通事务打断，而且信息披露不足。";
    zh.boundary = "健康的边界不是禁止处理工作，而是当工作影响亲密关系时，要及时同步，不让伴侣靠猜。";
    zh.adviceForThem = "下次一旦需要处理突发工作，最好直接说清：在和谁沟通、为什么现在必须处理、大概多久结束。";
    zh.verdict = "这是一次典型的‘突发工作 + 低透明沟通’事件，责任重点在说明义务没有做到位。";

    en.core = "The real issue is not work itself, but the lack of transparency when work interrupts your shared time.";
    en.fact = "A planned moment together was interrupted by last-minute work and communication tasks, with too little explanation.";
    en.boundary = "A healthy boundary is not banning work. It means updating your partner clearly when work affects the relationship.";
    en.adviceForThem = "When unexpected work shows up, they should say who it involves, why it matters now, and roughly when they will be back.";
    en.verdict = "This is a classic case of sudden work plus low-transparency communication, and the bigger responsibility lies in the lack of explanation.";
  }

  if (hasLateNight && hasMessage) {
    yourScore += 8;
    otherScore -= 8;
    zh.core = "半夜处理消息会天然放大不安感，所以‘我在回消息’这种模糊表述很容易引发误会。";
    zh.emotion = "你会生气，不只是因为他在忙，而是因为在最容易让人多想的时间点，他却给了最模糊的信息。";
    zh.verdict = "凌晨时段的模糊沟通，几乎等于主动制造误会。";

    en.core = "Late-night messaging naturally amplifies insecurity, so a vague line like 'I'm replying to messages' easily creates misunderstanding.";
    en.emotion = "You are upset not just because they were busy, but because they gave the vaguest possible answer at the exact time most likely to trigger overthinking.";
    en.verdict = "Late-night vague communication almost creates misunderstanding on purpose.";
  }

  if (hasPlanBreak) {
    yourScore += 5;
    otherScore -= 5;
    zh.fact = "你们本来有约定，但现实里出现临时变动，结果是期待落空。";
    zh.adviceForYou = "你可以直接区分两件事：一件是理解突发情况，一件是不能接受被临时晾着。";
    zh.adviceForThem = "取消或改计划不可怕，可怕的是只报结果、不交代过程，让你感觉自己不重要。";

    en.fact = "You had a shared plan, then a last-minute change interrupted it and left one person disappointed.";
    en.adviceForYou = "Separate two things clearly: understanding the emergency, and still not accepting being left hanging without explanation.";
    en.adviceForThem = "Changing plans is not the worst part. The worst part is reporting only the result and not the process, which makes you feel unimportant.";
  }

  if (hasEmotion || hasTrust) {
    zh.emotion = "你现在在意的已经不是单一事件，而是这件事是否再次证明：你的安全感总要靠自己硬扛。";
    en.emotion = "What hurts now is not just one incident, but the fear that your sense of security always has to be carried alone.";
  }

  yourScore = Math.max(15, Math.min(85, yourScore));
  otherScore = 100 - yourScore;

  return { zh, en, yourScore, otherScore };
}

function chooseJudge(text) {
  const value = [...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return judges[value % judges.length];
}

function judgeTone(judgeId, verdict, lang) {
  const prefixMap = {
    zh: {
      gentle: "本庭温柔提醒：",
      sharp: "本庭直接宣判：",
      cool: "本庭依据事实判断：",
      chaotic: "猫猫有话要说：",
    },
    en: {
      gentle: "Gentle ruling: ",
      sharp: "Direct ruling: ",
      cool: "Fact-based ruling: ",
      chaotic: "The cat judge says: ",
    },
  };
  return `${prefixMap[lang][judgeId] || ""}${verdict}`;
}

function pickBySeed(list, seedText, offset = 0) {
  if (!seedText) return list[0];
  const seed = [...seedText].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) + offset;
  return list[seed % list.length];
}

export default function CatCourtWeb() {
  const [caseText, setCaseText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [lang, setLang] = useState("zh");
  const [icebreakerSeed, setIcebreakerSeed] = useState(0);

  const analysis = useMemo(() => analyzeCase(submittedText), [submittedText]);
  const judge = useMemo(() => (submittedText ? chooseJudge(submittedText) : judges[0]), [submittedText]);
  const currentCopy = copy[lang];
  const judgeName = judge.name[lang];
  const judgeTitle = judge.title[lang];
  const judgeNote = judge.note[lang];
  const result = analysis ? analysis[lang] : null;
  const currentIcebreaker = useMemo(
    () => pickBySeed(icebreakers[lang], submittedText || caseText || "starter", icebreakerSeed),
    [lang, submittedText, caseText, icebreakerSeed]
  );
  const currentLongterm = useMemo(
    () => pickBySeed(relationshipTips[lang], submittedText || caseText || "tip", 9),
    [lang, submittedText, caseText]
  );

  const handleSubmit = () => {
    if (!caseText.trim()) return;
    setSubmittedText(caseText.trim());
  };

  const handleClear = () => {
    setCaseText("");
    setSubmittedText("");
    setIcebreakerSeed(0);
  };

  const fillExample = (text) => {
    setCaseText(text);
  };

  const rerollIcebreaker = () => {
    setIcebreakerSeed((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f8,_#ffe6ef_45%,_#ffd8e8_100%)] text-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_60px_rgba(244,114,182,0.18)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-3xl shadow-inner">⚖️</div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{currentCopy.appName}</h1>
                <p className="mt-1 text-sm text-zinc-500">{currentCopy.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setLang((prev) => (prev === "zh" ? "en" : "zh"))}
              className="inline-flex items-center gap-2 rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-pink-50"
            >
              <Languages className="h-4 w-4 text-pink-500" />
              {currentCopy.language}
            </button>
          </div>

          <div className="text-sm font-medium text-zinc-600">{currentCopy.sampleHeader}</div>
          <div className="grid gap-3 md:grid-cols-3">
            {starterCases.map((item) => (
              <button
                key={item.zh}
                onClick={() => fillExample(item[lang])}
                className="rounded-2xl border border-pink-100 bg-white px-4 py-3 text-left text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
              >
                {item[lang]}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(244,114,182,0.14)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center gap-2 text-zinc-700">
              <Scale className="h-5 w-5 text-pink-500" />
              <h2 className="text-lg font-semibold">{currentCopy.submitCase}</h2>
            </div>

            <textarea
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
              placeholder={currentCopy.placeholder}
              className="min-h-[280px] w-full resize-none rounded-[28px] border border-pink-100 bg-[#fffafc] px-5 py-4 text-[15px] leading-7 outline-none transition placeholder:text-zinc-400 focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                {currentCopy.analyze}
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-pink-50"
              >
                <RotateCcw className="h-4 w-4" />
                {currentCopy.clear}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className={`overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br ${judge.accent} p-6 shadow-[0_18px_50px_rgba(244,114,182,0.14)]`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">{currentCopy.todayJudge}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{judgeName}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{judgeTitle}</p>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">{judgeNote}</p>
                </div>
                <motion.div
                  key={judge.id + submittedText + lang}
                  initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/60 bg-white/70 text-5xl shadow-inner"
                >
                  {judge.emoji}
                </motion.div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(244,114,182,0.14)] backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-zinc-700">
                  <MessageCircleHeart className="h-5 w-5 text-pink-500" />
                  <h2 className="text-lg font-semibold">{currentCopy.verdictTitle}</h2>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key={submittedText + lang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl bg-pink-50 px-4 py-3 text-sm leading-6 text-zinc-700">
                      {judgeTone(judge.id, result.verdict, lang)}
                    </div>

                    <section className="grid gap-3">
                      <FairnessScale
                        leftLabel={currentCopy.youSide}
                        rightLabel={currentCopy.otherSide}
                        leftValue={analysis.yourScore}
                        rightValue={analysis.otherScore}
                        title={currentCopy.fairness}
                      />
                      <InfoCard title={currentCopy.core} content={result.core} />
                      <InfoCard title={currentCopy.facts} content={result.fact} />
                      <InfoCard title={currentCopy.emotion} content={result.emotion} />
                      <InfoCard title={currentCopy.boundary} content={result.boundary} />
                      <InfoCard title={currentCopy.yours} content={result.adviceForYou} />
                      <InfoCard title={currentCopy.theirs} content={result.adviceForThem} />
                      <MiniCard
                        icon={<HeartHandshake className="h-4 w-4 text-pink-500" />}
                        title={currentCopy.icebreaker}
                        content={currentIcebreaker}
                        actionLabel={currentCopy.redraw}
                        onAction={rerollIcebreaker}
                      />
                      <MiniCard
                        icon={<Lightbulb className="h-4 w-4 text-pink-500" />}
                        title={currentCopy.longterm}
                        content={currentLongterm}
                      />
                    </section>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] border border-dashed border-pink-200 bg-[#fffafc] px-8 text-center"
                  >
                    <div className="mb-4 text-5xl">🐾</div>
                    <h3 className="text-lg font-semibold text-zinc-700">{currentCopy.waiting}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                      {currentCopy.waitingDesc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, content }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-[#fffafc] px-4 py-3">
      <div className="mb-1 text-sm font-medium text-pink-600">{title}</div>
      <div className="text-sm leading-6 text-zinc-700">{content}</div>
    </div>
  );
}

function MiniCard({ icon, title, content, actionLabel, onAction }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-[#fffafc] px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-pink-600">
          {icon}
          {title}
        </div>
        {actionLabel && onAction ? (
          <button
            onClick={onAction}
            className="rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-pink-50"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      <div className="text-sm leading-6 text-zinc-700">{content}</div>
    </div>
  );
}

function FairnessScale({ title, leftLabel, rightLabel, leftValue, rightValue }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-[#fffafc] px-4 py-4">
      <div className="mb-3 text-sm font-medium text-pink-600">{title}</div>
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>

      <div className="relative mb-3 h-4 overflow-hidden rounded-full bg-pink-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${leftValue}%` }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
        />
      </div>

      <div className="flex items-center justify-between text-sm font-medium text-zinc-700">
        <span>{leftValue}%</span>
        <span>{rightValue}%</span>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative h-20 w-44">
          <div className="absolute left-1/2 top-1 -translate-x-1/2 text-lg">⚖️</div>
          <div className="absolute left-1/2 top-7 h-1 w-28 -translate-x-1/2 rounded-full bg-pink-300" />
          <motion.div
            animate={{ rotate: (rightValue - leftValue) * 0.22 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-1/2 top-7 h-1 w-28 origin-center -translate-x-1/2 rounded-full bg-transparent"
          >
            <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-xs shadow-sm">
              {leftValue}
            </div>
            <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-xs shadow-sm">
              {rightValue}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
