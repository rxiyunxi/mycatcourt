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

// 更通用的基于“维度”的分析，而不是枚举具体事件类型
function analyzeCase(text) {
  const normalized = text.trim();
  if (!normalized) return null;

  // 检测一组“维度”而不是具体场景
  const hasTimeBreak =
    /(临时|放鸽子|没做到|改时间|没兑现|失约|等了很久|爽约|cancel|reschedule|no show|last minute)/i.test(
      normalized
    );
  const hasWorkOrDuty =
    /(工作|加班|开会|老板|同事|公司|家务|照顾|带孩子|work|overtime|meeting|shift|duty)/i.test(normalized);
  const hasThirdParty =
    /(前任|暧昧|喜欢的人|别的女生|别的男生|同事暧昧|出轨|劈腿|小三|第三者|flirt|cheat|affair|crush|ex\b)/i.test(
      normalized
    );
  const hasCold =
    /(冷暴力|拉黑|不回|已读不回|消失|不理我|冷淡|冷漠|ignore|ghost|silent|silent treatment)/i.test(
      normalized
    );
  const hasMoney =
    /(钱|花销|房租|房贷|转账|借钱|AA|付钱|报销|工资|income|money|bill|rent|pay|transfer|spend)/i.test(
      normalized
    );
  const hasFamily =
    /(父母|妈妈|爸爸|家里人|家人|公婆|婆婆|岳父母|原生家庭|父母干预|parents|family|in‑laws|inlaws)/i.test(
      normalized
    );
  const hasTrust =
    /(信任|边界|透明|安全感|隐瞒|不说|欺骗|撒谎|骗我|trust|boundary|transparent|safety|hide|lie)/i.test(
      normalized
    );
  const hasEmotion =
    /(生气|难过|委屈|失望|不开心|崩溃|烦|心凉|受伤|心痛|angry|upset|hurt|disappointed|sad)/i.test(
      normalized
    );
  const hasRepeat =
    /(总是|老是|每次|一次又一次|很多次|一直|长期|for a long time|again and again|every time)/i.test(
      normalized
    );

  // 纯“偏好/选择”类小冲突（吃什么、去哪玩之类）
  const hasPreferenceConflict =
    /(吃什么|去哪|看什么|玩什么|点什么|点餐|外卖|电影|餐厅|口味|想吃|想去|吃肯德基|吃麦当劳|吃披萨|吃火锅|choose|pick|decide where|what to eat)/i.test(
      normalized
    );

  // 对方做的难吃 / 我不想吃 / 对方怪我浪费：责任更多在“难吃还怪人不吃”的一方
  const hasBadCookingAndBlameWaste =
    /(难吃|不好吃|做糊了|做咸了|做坏了|太难吃).*?(不想吃|不吃|浪费)|(浪费).*?(难吃|不好吃)|(怪我浪费|说我浪费)/i.test(
      normalized
    );
  const hasCookingContext = /(做饭|做菜|做的|煮的|做的饭|cooking|cook)/i.test(normalized);

  // 共同生活 / 攒钱 / 未来开支（两人一起过日子、还没经济自由）
  const hasSharedLife =
    /(攒钱|生活开支|共同生活|经济自由|生活|过日子|未来|存钱|浪费钱|还没到|save|save up|life together|shared life|future|living expenses|waste)/i.test(
      normalized
    );

  // 提交者忘记重要日期/礼物（生日、纪念日等），对方受伤
  const hasForgottenByMe =
    /(我忘记|我忘了|我没准备|忘记准备|忘了准备|忘了买|忘记买|忘记送|忘了送|没准备礼物|没送礼物|forgot|forget to prepare)/i.test(
      normalized
    );
  const hasImportantDate =
    /(生日|纪念日|周年|礼物|惊喜|birthday|anniversary|gift|surprise)/i.test(normalized);

  // 在我家/我父母 + 让伴侣做事 + 没帮对方说话：责任更多在没护着伴侣的一方
  const hasMyFamilyHost =
    /(来我家|我家里|我父母|我妈|我爸|我爸妈|at my place|my parents)/i.test(normalized);
  const hasFamilyAskedPartner =
    /(让她|让他|让.*洗碗|让.*干活|叫.*洗碗|父母让|ask.*to (wash|do))/i.test(normalized);
  const hasDidntStandUp =
    /(没帮着她说话|没帮我说话|没站在我这边|没站在她那边|怪我没|没护着|没帮着说话|没帮我说|didn't stand up|didn't support)/i.test(
      normalized
    );

  // 我过生日/节日没送对方礼物 + 否定对方想要礼物的感受（如「男人要什么礼物」「历史是女人收的」）：责任更多在否定感受的一方
  const hasDismissPartnerGiftWish =
    /(男人要什么礼物|女人收的|历史是女人收的|男生要什么礼物|要什么礼物啊)/i.test(normalized);
  const hasNoGiftToPartnerAndTheyHurt =
    /(没送|不送).*?(男朋友|女朋友|他|她|对方).*?(伤心|难过)|(对方|他|她).*?(伤心|难过).*?(没送|不送)/i.test(
      normalized
    );

  // 默认不偏向提交者：从 50:50 起，只根据案件内容再加减
  let yourScore = 50;
  let otherScore = 50;

  const zh = {
    core: "",
    fact: "",
    emotion: "",
    boundary: "",
    adviceForYou: "",
    adviceForThem: "",
    verdict: "",
  };

  const en = {
    core: "",
    fact: "",
    emotion: "",
    boundary: "",
    adviceForYou: "",
    adviceForThem: "",
    verdict: "",
  };

  // 如果只有偏好冲突，没有工作/金钱/信任等严重维度，就走一套更轻的小分歧模板
  const onlyPreference =
    hasPreferenceConflict &&
    !hasTimeBreak &&
    !hasWorkOrDuty &&
    !hasThirdParty &&
    !hasCold &&
    !hasMoney &&
    !hasFamily &&
    !hasTrust;

  if (onlyPreference) {
    yourScore = 52;
    otherScore = 48;

    zh.fact =
      "这次冲突本质上是一场‘偏好之争’：你们在吃什么、去哪或怎么安排上意见不同，最后升级成了情绪对抗。";
    en.fact =
      "This conflict is mainly about preferences: you two wanted different things (where to go, what to eat), and it escalated into an emotional fight.";

    zh.core =
      "核心不是谁的选择更对，而是你们暂时缺少一套‘遇到小分歧时怎么协调’的规则，所以每次都要靠吵架来决定。";
    en.core =
      "The core is not whose choice is objectively better, but that you lack a shared rule for handling small preference clashes, so arguments become the default decision tool.";

    zh.emotion =
      "你在情绪里感受到的，可能不是这顿饭本身，而是：我的想法有没有被当回事、我们是不是总是在抢掌控权。";
    en.emotion =
      "Emotionally, it’s less about this one meal and more about whether your wishes are taken seriously and who gets to steer the situation.";

    zh.boundary =
      "这种小事的边界，不在于谁先让步，而在于能不能约定：下次遇到类似情况，用轮流决定、折中方案或预算上限来解决，而不是用吵架。";
    en.boundary =
      "Boundaries here aren’t about banning choices, but about agreeing on patterns: taking turns deciding, finding middle options, or setting simple rules so you don’t have to fight each time.";

    zh.adviceForYou =
      "你可以试着把这次吵架翻译成一句话告诉对方：我在意的是‘被尊重参与决定’，而不是一定要吃哪一家。然后提议一两个你也能接受的折中方案。";
    en.adviceForYou =
      "Try translating the fight into one clear sentence: 'What I care about is being part of the decision, not which exact place we choose,' and then offer one or two compromises you’d genuinely accept.";

    zh.adviceForThem =
      "如果对方愿意听建议，他/她可以练习在这种小选择上多问一句‘你更想要哪个’，并主动提出轮流决定或组合方案，而不是直接拍板。";
    en.adviceForThem =
      "If they’re open to advice, they can practice asking 'what do you prefer this time?' and suggesting turn‑taking or mix‑and‑match options instead of deciding unilaterally.";

    zh.verdict =
      "就本案而言，你们更多是在为‘谁说了算’较劲，谁对谁错都不算绝对。比起判谁输赢，更重要的是一起发明一套你们都舒服的“小事决策方式”。";
    en.verdict =
      "In this case, the struggle is mostly about 'who gets to decide' rather than clear right or wrong. More useful than declaring a winner is designing a small‑decision routine you both feel good about.";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "约定：下次遇到‘吃什么、去哪’这类小事，轮流决定或一人提两个选项让对方选，不再为这一顿吵。",
        en: "Agree: next time for small choices like where to eat, take turns deciding or one suggests two options for the other to pick—no fighting over this one.",
      },
      longterm: {
        zh: "小事上建立‘轮流拍板’或‘折中方案’的习惯，比每次争赢更有助于关系。",
        en: "Building a habit of turn‑taking or compromise on small things helps the relationship more than winning each argument.",
      },
    };
  }

  // 金钱 + 共同生活：一方大额享乐消费，另一方担心生活开支，双方都有道理，判决更平衡
  if (hasMoney && hasSharedLife) {
    yourScore = 50;
    otherScore = 50;

    zh.fact =
      "你们在共同生活或为未来攒钱，其中一方想花一笔钱在个人享乐上（比如买电脑、买包），另一方觉得浪费、希望把钱用在生活或储蓄上。";
    en.fact =
      "You two are building a shared life or saving for the future. One wants to spend on personal pleasure (e.g. a computer, a bag), the other thinks it's wasteful and wants the money for living expenses or savings.";

    zh.core =
      "核心不是‘我的钱我做主’vs‘你乱花钱’，而是：你们对‘共同生活’的边界还没对齐。一方享乐消费，另一方可能就要多承担生活开支，而花钱的那一方有没有认真考虑过对方的负担和感受。";
    en.core =
      "The core is not 'my money my choice' vs 'you waste money,' but that you haven't aligned on what 'shared life' means. One person's pleasure spending may mean the other bears more living costs—and the spender may not have seriously considered that burden.";

    zh.emotion =
      "花钱的一方在意自主权，省钱的一方在意被看见、被一起规划未来。两边都有合理诉求，问题在于有没有把对方纳入考量。";
    en.emotion =
      "The spender cares about autonomy; the saver cares about being seen and planning the future together. Both have valid feelings—the issue is whether each has factored the other in.";

    zh.boundary =
      "共同生活的金钱边界，不是谁对谁错，而是：大额支出要不要提前商量、享乐和储蓄的比例怎么分配、双方对‘我们还没到经济自由’这件事是否认同。";
    en.boundary =
      "Financial boundaries in shared life aren't about right or wrong, but about: whether big purchases need prior discussion, how to balance pleasure vs savings, and whether you both agree you're not yet financially free.";

    zh.adviceForYou =
      "如果你是花钱的一方：可以先承认对方的担忧有道理，再说明这笔钱对你意味着什么、你愿意在别的地方怎么补偿（比如接下来几个月多承担一点生活开支）。如果你是省钱的一方：可以表达‘我不是要控制你，而是希望我们一起来规划’，并提议一个你们都舒服的‘大额支出门槛’——超过多少就一起商量。";
    en.adviceForYou =
      "If you're the spender: acknowledge their concern, explain what this purchase means to you, and offer to offset it (e.g. cover more living costs for a few months). If you're the saver: say 'I'm not trying to control you, but I want us to plan together,' and suggest a threshold—above X amount, you discuss first.";

    zh.adviceForThem =
      "对方也需要听见：这不是在否定你的自主权，而是在问‘我们’的边界在哪里。愿意一起定规则，比争谁对谁错更有用。";
    en.adviceForThem =
      "They also need to hear: this isn't about denying your autonomy, but about defining 'our' boundaries. Agreeing on rules together is more useful than arguing who's right.";

    zh.verdict =
      "本案双方都有道理，本庭不做明显倾斜。花钱的一方有支配自己收入的权利，但共同生活时，大额享乐消费会加重另一方的负担；省钱的一方有理由担心未来，但也要尊重对方对‘自己的钱’的感受。更关键的是：一起定一个‘大额支出怎么商量’的规则，而不是每次都为这一笔吵。";
    en.verdict =
      "Both sides have valid points; this court does not lean strongly either way. The spender has a right to their income, but in shared life, big pleasure spending shifts burden to the other; the saver has reason to worry, but should also respect the other's sense of ownership. What matters more: agree on a rule for when big purchases need discussion, instead of fighting over each one.";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "今晚一起写一条规则：超过多少金额的支出，我们会先跟对方说一声再决定？写下来贴在冰箱上，下次就不会为‘你为什么不商量’吵。",
        en: "Tonight write down one rule: above what amount do we check in with each other before spending? Put it on the fridge so you don’t fight over 'why didn’t you ask' next time.",
      },
      longterm: {
        zh: "共同生活的钱，提前定好‘大额门槛’和‘享乐 vs 储蓄’的大致比例，比事后翻旧账有用得多。",
        en: "For shared life money, agreeing in advance on a 'big purchase threshold' and a rough balance of fun vs savings beats rehashing the same fight later.",
      },
    };
  }

  // 忘记重要日期/礼物：提交者忘记生日、纪念日等，对方受伤，责任更多在忘记的一方
  if (hasForgottenByMe && hasImportantDate) {
    yourScore = 35;
    otherScore = 65;

    zh.fact =
      "你在对方的重要日子（生日、纪念日等）忘记准备礼物或表达，对方因为感到被忽视而很难过，你们因此吵架。";
    en.fact =
      "You forgot to prepare a gift or express care on an important day (birthday, anniversary, etc.), and they felt hurt and neglected, leading to an argument.";

    zh.core =
      "核心不是‘记不记得’的记性问题，而是：对方有没有被放在重要位置。忘记生日、纪念日，会让对方觉得‘我在你心里不重要’，这种感受是合理的。";
    en.core =
      "The core is not about memory, but about whether they feel prioritized. Forgetting birthdays or anniversaries makes them feel 'I’m not important to you'—and that feeling is valid.";

    zh.emotion =
      "对方难过的，不只是没收到礼物，而是：这么重要的日子你都不记得，我是不是在你心里很边缘。";
    en.emotion =
      "What hurts them is not just the missing gift, but the feeling that if you don’t remember this day, maybe they’re not on your mind at all.";

    zh.boundary =
      "亲密关系里，对重要日子的重视是一种基本尊重。不是要求你记性多好，而是：可以提前设提醒、提前准备，让对方感受到你愿意花心思。";
    en.boundary =
      "In close relationships, honoring important dates is a basic form of respect. It’s not about having perfect memory, but about setting reminders and preparing in advance so they feel you’re willing to put in effort.";

    zh.adviceForYou =
      "你可以先诚恳道歉，承认这件事确实让对方受伤了。然后主动提出：以后会设提醒、提前准备，并问对方‘有没有特别在意的事，希望我这次怎么补上’。";
    en.adviceForYou =
      "Start with a sincere apology and acknowledge that this hurt them. Then offer to set reminders and prepare in advance next time, and ask: 'Is there something specific you’d like me to do to make it up?'";

    zh.adviceForThem =
      "对方可以表达：我在意的不是礼物本身，而是你有没有把我放在心上。如果对方愿意道歉并改进，可以一起定一个‘重要日子提醒’的小规则，而不是一直翻旧账。";
    en.adviceForThem =
      "They can say: what matters isn’t the gift itself, but whether you hold them in mind. If you’re willing to apologize and change, agree on a simple reminder rule for important dates instead of dwelling on old resentments.";

    zh.verdict =
      "本案责任更多在忘记的一方。对方因为感到被忽视而难过，是合理的。忘记的一方需要承认疏忽、道歉，并用实际行动（设提醒、补上心意）来弥补，而不是只说‘我记性不好’就带过。";
    en.verdict =
      "In this case, more responsibility lies with the one who forgot. The other’s hurt feelings are valid. The one who forgot needs to acknowledge the oversight, apologize, and make it up with concrete actions (reminders, a thoughtful gesture)—not just dismiss it with 'I have a bad memory.'";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "忘记的一方立刻在手机里设好对方生日和纪念日的提醒，并问一句：这次你希望我怎么补上？一顿饭、一个小礼物，还是专门留出一晚只属于你们的时间。",
        en: "The one who forgot sets a phone reminder for their birthday and anniversary right away, and asks: 'How would you like me to make it up this time?'—a meal, a small gift, or a night just for the two of you.",
      },
      longterm: {
        zh: "重要日子提前设提醒、提前准备，让对方感到‘你愿意花心思’，比事后解释‘我记性差’更能维护关系。",
        en: "Setting reminders and preparing in advance for important dates shows 'you’re willing to put in effort'—that does more for the relationship than explaining afterward that you have a bad memory.",
      },
    };
  }

  // 在我家/我父母面前，家人让伴侣做事，而你没帮对方说话：责任更多在你
  if (
    hasFamily &&
    hasMyFamilyHost &&
    (hasFamilyAskedPartner || hasDidntStandUp) &&
    hasDidntStandUp
  ) {
    yourScore = 35;
    otherScore = 65;

    zh.fact =
      "对方以客人身份来到你家，你的家人让 TA 做了本该不属于客人做的事（比如洗碗、干活），而你在现场没有站出来替 TA 说话，TA 感到不被尊重、也不被你在乎。";
    en.fact =
      "They came to your home as a guest. Your family asked them to do something that isn't a guest's job (e.g. washing dishes, chores), and you didn't speak up for them. They felt disrespected and unsupported by you.";

    zh.core =
      "核心不是‘洗碗’本身，而是：在你的地盘、你的家人面前，你有没有把伴侣当成需要被护着的人。对方生气、怪你没帮着说话，是合理的。";
    en.core =
      "The core isn't the chore itself, but whether in your space, in front of your family, you showed that your partner deserves to be backed up. Their anger and blame that you didn't speak up are reasonable.";

    zh.emotion =
      "对方难过的，不只是被使唤，而是：在你家人面前，你选择了沉默或站家人那边，TA 会觉得自己是外人、你靠不住。";
    en.emotion =
      "What hurts them isn't just being asked to do the task, but that in front of your family you stayed silent or sided with them—so they feel like an outsider and that they can't count on you.";

    zh.boundary =
      "成熟的边界是：在你家，你要主动承担‘自己人’和‘家人’之间的缓冲。该你挡的你要挡，该你开口的你要开口，而不是让伴侣独自面对你父母的期待。";
    en.boundary =
      "A mature boundary means: in your home, you act as the buffer between your partner and your family. You step in when needed and speak up when it's your place—not leave your partner alone against your parents' expectations.";

    zh.adviceForYou =
      "你可以先承认：当时没站出来是我不对，让你在我家受委屈了。然后和父母沟通：下次 TA 来是客人，家务我们自己来。并让对方知道：以后类似情况你会先开口。";
    en.adviceForYou =
      "Start by acknowledging: I was wrong not to speak up; you shouldn't have been put in that position in my home. Then talk to your parents: when they visit, they're a guest; we'll handle chores. And let your partner know you'll speak up first next time.";

    zh.adviceForThem =
      "对方可以明确告诉你：我在意的不是那几只碗，而是你有没有把我当自己人护着。如果你愿意道歉并以后主动挡在前面，这件事可以翻篇。";
    en.adviceForThem =
      "They can tell you clearly: it's not about the dishes, it's about whether you had my back. If you're willing to apologize and step up next time, we can move on.";

    zh.verdict =
      "本案责任更多在没护着伴侣的一方。在你家、你家人面前，你有义务先开口、先挡一下，而不是让伴侣独自承受。对方因此生气和失望，是合理的。";
    en.verdict =
      "In this case, more responsibility lies with the one who didn't support their partner. In your home, in front of your family, you have a duty to speak up and buffer—not leave your partner to face it alone. Their anger and disappointment are justified.";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "你先跟父母说清楚：下次 TA 来是客人，洗碗/干活我们自己来。再当面跟对方认一句：当时没站出来是我不对，以后我会先开口。",
        en: "Tell your parents clearly: next time they visit as a guest, we'll handle the dishes/chores. Then say to your partner: I was wrong not to speak up; I'll step in first next time.",
      },
      longterm: {
        zh: "在你家，你要做伴侣和父母之间的缓冲；该你挡的你要挡，该你开口的你要开口，伴侣才会觉得被当自己人。",
        en: "In your home, you're the buffer between your partner and your family. When you step in and speak up, your partner feels they're treated as family.",
      },
    };
  }

  // 我过生日/节日没送对方礼物 + 否定对方想要被惦记的感受（如「男人要什么礼物」「历史是女人收的」）：责任更多在否定感受的一方
  if (hasImportantDate && hasDismissPartnerGiftWish && hasNoGiftToPartnerAndTheyHurt) {
    yourScore = 35;
    otherScore = 65;

    zh.fact =
      "在生日或节日里，你没有送对方礼物，对方因此难过。你用‘男人要什么礼物’、‘历史是女人收的’等说法否定了 TA 想要被惦记、被重视的感受。";
    en.fact =
      "On a birthday or holiday you didn't give them a gift, and they were hurt. You dismissed their wish to be remembered and valued with lines like 'what do men need gifts for' or 'historically women receive them.'";

    zh.core =
      "核心不是‘谁该收礼物’，而是：对方表达‘我希望被你惦记’时，你有没有接住。用性别或传统来否定伴侣的感受，会让 TA 觉得自己的需求不被当回事。";
    en.core =
      "The core isn't who 'should' receive gifts, but whether you acknowledged their wish to be thought of. Dismissing your partner's feelings with gender or tradition makes them feel their needs don't matter.";

    zh.emotion =
      "对方难过的，不只是没收到礼物，而是：连‘我想要你想着我’这件事都被你否定了，会觉得自己在你心里不重要。";
    en.emotion =
      "What hurts them isn't just the missing gift, but that even 'I want you to think of me' got dismissed—they feel unimportant to you.";

    zh.boundary =
      "礼物是‘被惦记’的一种表达。对方有权希望在你重要的日子里也被你惦记；你可以量力而行，但不该用‘男人/女人不该要’来否定这种期待。";
    en.boundary =
      "Gifts are one way of showing 'you're on my mind.' They're allowed to want to be remembered on your day too; you can scale it to what you're comfortable with, but shouldn't dismiss that wish with 'men/women shouldn't expect gifts.'";

    zh.adviceForYou =
      "你可以先承认：你说‘男人要什么礼物’确实否定了他的感受，这不是你的本意。再问一句：你希望我怎么表达‘我有想着你’？不一定贵，可以是一张小卡片、一顿饭、一句提前的祝福，重点是让他感到被看见。";
    en.adviceForYou =
      "Acknowledge first: saying 'what do men need gifts for' did dismiss his feelings, and that wasn't your intent. Then ask: how would you like me to show I'm thinking of you? It doesn't have to be expensive—a card, a meal, a message in advance—the point is he feels seen.";

    zh.adviceForThem =
      "对方可以明确说：我在意的不是礼物贵不贵，而是你有没有把我放在心上。如果你愿意用你的方式补上一份心意，这件事可以翻篇。";
    en.adviceForThem =
      "They can say clearly: it's not about the price, it's about whether you had me in mind. If you're willing to show that in your way, we can move on.";

    zh.verdict =
      "本案责任更多在否定对方感受的一方。对方想要被惦记、被重视是合理的；用性别或传统来堵住这种需求，会让关系里的尊重感变少。";
    en.verdict =
      "In this case, more responsibility lies with the one who dismissed the other's feelings. Wanting to be remembered and valued is valid; using gender or tradition to shut that down weakens respect in the relationship.";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "你主动说一句：那次是我不对，不该用‘男人要什么礼物’否定你的感受。然后问：你希望以后在这种日子里，我怎么让你感到被惦记？",
        en: "Say once: I was wrong to dismiss you with 'what do men need gifts for.' Then ask: how would you like me to make you feel thought of on those days from now on?",
      },
      longterm: {
        zh: "礼物是‘被惦记’的载体。对方有权希望在你重要的日子也被你想着；用你的方式表达就好，但别用性别或传统否定这种期待。",
        en: "Gifts carry 'you're on my mind.' They're allowed to want that on your day too—show it in your way, but don't dismiss that wish with gender or tradition.",
      },
    };
  }

  // 对方做的难吃、我不想吃、对方怪我浪费：看实际情况分析，不一刀切；对方努力了要看见，同时不强迫吃、不听任用“浪费”施压
  if (hasBadCookingAndBlameWaste && hasCookingContext) {
    yourScore = 50;
    otherScore = 50;

    zh.fact =
      "对方做了饭，你觉得不好吃所以没吃或没吃完，对方因此怪你浪费、不领情。双方对‘是否真的难吃’‘有没有看见对方努力’可能有不同感受。";
    en.fact =
      "They cooked, you found it unappealing so you didn't eat or didn't finish, and they blamed you for wasting or not appreciating it. You may disagree on how bad it was and whether the effort was seen.";

    zh.core =
      "本庭按实际情况分析，不先入为主。做饭的一方付出了努力，需要被看见；同时口味是主观的，不强迫对方吃、也不用‘浪费’施压，是基本尊重。若一方用‘浪费’‘不领情’持续施压，责任会偏那一方；若另一方完全否定对方付出，责任会偏这一方。";
    en.core =
      "This court looks at the actual situation, without taking sides in advance. The one who cooked put in effort and deserves to be seen; at the same time, taste is subjective—not forcing the other to eat or pressuring with 'waste' is basic respect. If one keeps guilt-tripping with 'waste,' responsibility shifts that way; if the other dismisses the effort entirely, it shifts the other way.";

    zh.emotion =
      "做饭的一方希望被看见、被肯定；没吃的一方可能觉得自己的口味没有被尊重，或被‘浪费’指责得很委屈。两边都有可理解的情绪。";
    en.emotion =
      "The cook wants to be seen and appreciated; the one who didn't eat may feel their taste wasn't respected or feel unfairly blamed for 'waste.' Both sides have understandable feelings.";

    zh.boundary =
      "可以感谢对方的心意，同时表达口味偏好；可以希望对方多少尝一点以示尊重，但不该用‘浪费’绑架对方硬吃。一起商量：下次少做、做前问想吃什么、或谁试味，比单方面要求更健康。";
    en.boundary =
      "You can thank the effort and still express your taste; you can hope they try a bit to show respect, but shouldn't guilt them into finishing. Agree together: cook less, ask what they want first, or share tasting—healthier than one-sided demands.";

    zh.adviceForYou =
      "如果你是做饭的一方：可以问对方‘哪里不合口味’，下次改进，而不是只怪浪费。如果你是没吃的一方：可以先肯定对方辛苦，再具体说‘这次哪里不合我口味’，并提议一起商量下次做多少、做什么。";
    en.adviceForYou =
      "If you cooked: ask what didn't work for them and try to improve next time, rather than only blaming waste. If you didn't eat: acknowledge their effort first, then say what didn't work for you and suggest deciding together how much to make and what next time.";

    zh.adviceForThem =
      "对方也需要被听见：要么是‘我有看见你的付出，只是这次真的不合口味’，要么是‘你可以表达口味，但别完全否定我的努力’。根据实际情况，谁更愿意沟通、谁更在用指责施压，会影响责任判断。";
    en.adviceForThem =
      "They need to be heard too: either 'I see your effort, it just wasn't to my taste this time,' or 'you can say what you like, but don't dismiss my effort entirely.' Depending on who's more willing to talk and who's pressuring with blame, responsibility may shift.";

    zh.verdict =
      "本案本庭不做一刀切。双方都要看见对方的付出和感受：做饭的努力值得被肯定，不强迫吃、不用‘浪费’施压也是底线。和解建议：少做多问、具体说口味、不拿浪费吵架。";
    en.verdict =
      "This court doesn't apply a single rule. Both sides need to see the other's effort and feelings: the cook's effort deserves recognition; not forcing eating or pressuring with 'waste' is a baseline. For reconciliation: cook less, ask more, be specific about taste, don't fight over waste.";

    return {
      zh,
      en,
      yourScore,
      otherScore,
      icebreaker: {
        zh: "一起约定：以后做饭先少做一点，或做前问一句对方想吃什么；吃不下可以留到下一顿，不拿‘浪费’来吵架。同时没吃的一方可以说一句：谢谢你的心意，这次哪里不合我口味我下次直接说。",
        en: "Agree: cook smaller portions or ask what they want first; leftovers are fine, don't fight over 'waste.' The one who didn't eat can add: thanks for the effort, I'll tell you what didn't work for me next time.",
      },
      longterm: {
        zh: "口味不同很正常；既看见对方做饭的努力，也不强迫吃、不用‘浪费’施压，少做多问比硬要吃完更健康。",
        en: "Different tastes are normal; see the cook's effort, and don't force eating or pressure with 'waste.' Cook less, ask more—healthier than demanding they finish.",
      },
    };
  }

  // 事实层面：根据命中的维度拼接
  const zhFacts = [];
  const enFacts = [];

  if (hasTimeBreak) {
    zhFacts.push(
      "你们之间有明确的约定或期待，但现实中经常被临时改变或放下，导致期待落空。爽约的一方通常更不占理；若事后态度诚恳、有解释或补偿，可适度平衡；和解时一定要认真听委屈一方的表达。"
    );
    enFacts.push(
      "You two had agreements or plans, but they were changed or dropped at the last minute, leaving expectations unmet. The one who broke the plan usually bears more responsibility; if they later show genuine apology, explanation, or make-up, that can balance somewhat—and when making up, the hurt party's voice must be heard."
    );
    yourScore += 5;
    otherScore -= 5;
  }
  if (hasWorkOrDuty) {
    zhFacts.push("对方把工作或其他责任放进了你们的相处时间里，现实压力客观存在。");
    enFacts.push(
      "Work or other duties are intruding into your shared time together, and there is some objective pressure."
    );
  }
  if (hasThirdParty) {
    zhFacts.push(
      "你注意到对方和第三人的互动频率、语气或边界，让你开始不安。有第三者、暧昧、没边界感或与异性过度分享生活而不顾伴侣感受的一方，更不占理。"
    );
    enFacts.push(
      "You noticed the frequency, tone, or boundaries of their interactions with a third person and started to feel uneasy. The one with third-party involvement, flirtation, poor boundaries, or oversharing life with others while ignoring their partner's feelings is more at fault."
    );
    yourScore += 10;
    otherScore -= 10;
  }
  if (hasCold) {
    zhFacts.push("当关系出现问题时，对方更倾向于用沉默、拉黑或失联来处理，而不是正面回应。");
    enFacts.push(
      "When there is tension, they tend to use silence, blocking, or disappearing instead of responding directly."
    );
    yourScore += 10;
    otherScore -= 10;
  }
  if (hasMoney) {
    zhFacts.push("在金钱或资源分配上，你感受到付出与回报之间不太平衡。");
    enFacts.push("Around money or shared resources, you feel an imbalance between what each of you gives and receives.");
  }
  if (hasFamily) {
    zhFacts.push("原生家庭或长辈的意见频繁进入你们的关系决策里。");
    enFacts.push("Your families or parents are frequently involved in decisions that affect your relationship.");
  }

  if (zhFacts.length === 0) {
    zhFacts.push("这件事牵涉到你们的相处方式、期待落差和沟通方式。");
    enFacts.push("This situation involves how you spend time together, mismatched expectations, and communication style.");
  }

  zh.fact = zhFacts.join(" ");
  en.fact = enFacts.join(" ");

  // 核心与边界：组合多个维度
  const zhCoreParts = [];
  const enCoreParts = [];

  if (hasTimeBreak || hasWorkOrDuty) {
    zhCoreParts.push(
      "表面上像是时间安排或现实压力的问题，核心其实是你们如何对齐期待、及时说明变化。爽约的一方更不占理；若态度良好或有补偿，可适度平衡；给出和解建议时，必须听委屈一方的表达。"
    );
    enCoreParts.push(
      "On the surface this looks like a scheduling or practical pressure issue, but the core is how you align expectations and signal changes. The one who broke the plan is more at fault; if they show good attitude or make-up, that can balance somewhat—and any reconciliation must center on hearing the hurt party's side."
    );
  }
  if (hasThirdParty) {
    zhCoreParts.push(
      "与异性暧昧、没边界感、和异性分享生活而不顾伴侣感受的一方，在本案中更不占理。边界和信任是核心：对方和他人的距离是否清晰、是否主动让你安心。"
    );
    enCoreParts.push(
      "The one who has blurred boundaries with others, flirtation, or shares life with another person without regard for their partner is more at fault in this case. Boundaries and trust are central: how clearly they draw the line with others and whether they actively reassure you."
    );
  }
  if (hasCold) {
    zhCoreParts.push("更深一层是冲突处理方式：用消失和冷处理，会让安全感被一点点掏空。");
    enCoreParts.push(
      "Deeper down, this is about conflict style: using disappearance and silence slowly erodes your sense of safety."
    );
  }
  if (hasMoney) {
    zhCoreParts.push("金钱分配背后，其实是在问：我们是不是在同一条船上，还是有人在默默多扛。");
    enCoreParts.push(
      "Behind money questions lies: are we truly in the same boat, or is one person silently carrying more than the other?"
    );
  }
  if (hasFamily) {
    zhCoreParts.push("还有‘我们的小家’和‘原生家庭’之间的站位：谁的话在亲密关系里更优先。");
    enCoreParts.push(
      "There is also the tension between 'our relationship' and the original family: whose voice has priority in intimate decisions."
    );
  }

  if (zhCoreParts.length === 0) {
    zhCoreParts.push("总体来说，这是一次关于被看见、被解释清楚、以及被放在什么位置的拉扯。");
    enCoreParts.push(
      "Overall, this is a tug‑of‑war about being seen, being given clear explanations, and understanding where you stand in their priorities."
    );
  }

  zh.core = zhCoreParts.join(" ");
  en.core = enCoreParts.join(" ");

  // 情绪与建议
  if (hasEmotion || hasTrust) {
    zh.emotion =
      "你现在难过的，已经不只是这一次具体事件，而是它像在重复证明：你的安全感需要靠自己扛着。";
    en.emotion =
      "What hurts is no longer just this single event; it feels like another proof that your sense of safety has to be carried alone.";
  } else {
    zh.emotion =
      "即使你在讲述时很冷静，这件事背后也有失衡和不被理解的感觉，只是你暂时把它压住了。";
    en.emotion =
      "Even if you sound calm describing it, there is an underlying sense of imbalance and not being understood that you’re holding down.";
  }

  const zhBoundary = [];
  const enBoundary = [];

  if (hasTrust || hasThirdParty) {
    zhBoundary.push("关于边界：重要的不是是否接触别人，而是这些接触是否在阳光下、是否让你被告知。");
    enBoundary.push(
      "For boundaries: the key is not whether they interact with others, but whether those interactions are transparent and shared with you."
    );
  }
  if (hasCold) {
    zhBoundary.push("关于冲突：沉默和拉黑会让界限变成‘你一开口，我就让你觉得自己多余’。");
    enBoundary.push(
      "For conflict: silence and blocking turn the boundary into 'if you speak up, I’ll make you feel unwanted.'"
    );
  }
  if (hasMoney) {
    zhBoundary.push("关于金钱：谁付多少可以商量，但谁的付出被当回事，这一点不能含糊。");
    enBoundary.push(
      "For money: exact numbers are negotiable, but whose contribution is recognized and appreciated is not."
    );
  }
  if (hasFamily) {
    zhBoundary.push("关于家人：成熟的边界不是和父母对立，而是先在你们两个人之间形成统一立场。");
    enBoundary.push(
      "For family: mature boundaries don’t mean fighting your parents, but forming a united stance between the two of you first."
    );
  }

  if (zhBoundary.length === 0) {
    zhBoundary.push("这件事提醒你们，需要把‘哪些事要提前说’和‘哪些底线不能碰’讲得更具体一点。");
    enBoundary.push(
      "This case suggests you two need clearer agreements on 'what must be shared in advance' and 'which lines cannot be crossed.'"
    );
  }

  zh.boundary = zhBoundary.join(" ");
  en.boundary = enBoundary.join(" ");

  zh.adviceForYou =
    "你可以尽量用具体情境来说：哪一个瞬间让你开始不安、你理想中希望他/她怎么做，而不是只说‘我很难受’。";
  en.adviceForYou =
    "Try to describe concrete moments: which exact scene made you uneasy, and what you would have wished them to do instead, rather than only saying 'I feel bad.'";

  zh.adviceForThem =
    "如果对方也愿意听建议，本案更需要的是：及时说明、诚实回应和愿意调整自己的习惯，而不是只说‘你别多想’。";
  en.adviceForThem =
    "If they’re open to advice, what this situation really calls for is timely updates, honest answers, and willingness to adjust habits—not just saying 'don’t overthink.'";

  // 谁更占理：根据维度调整（第三者/暧昧/没边界感明确不占理，已在上文 hasThirdParty 中 +10）
  if (hasCold || hasTrust) {
    yourScore += 8;
    otherScore -= 8;
  }
  if (hasWorkOrDuty && !hasTimeBreak) {
    // 对方有客观压力时略微平衡
    yourScore -= 3;
    otherScore += 3;
  }
  if (hasRepeat) {
    yourScore += 5;
    otherScore -= 5;
  }

  yourScore = Math.max(15, Math.min(85, yourScore));
  otherScore = 100 - yourScore;

  zh.verdict =
    zh.verdict ||
    "本庭根据具体事件分析，不先入为主支持某一方。双方都有各自的感受和立场；如果想要关系继续走下去，接下来要从‘吵这一件事’，变成一起商量新的相处规则。";
  en.verdict =
    en.verdict ||
    "This court analyzes the specific situation and does not presume to side with either party. Both of you have your own feelings and positions; if you want the relationship to continue, the next step is to move from arguing about this one event to designing new rules for how you relate.";

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
  const fallbackIcebreaker = useMemo(
    () => pickBySeed(icebreakers[lang], submittedText || caseText || "starter", icebreakerSeed),
    [lang, submittedText, caseText, icebreakerSeed]
  );
  const fallbackLongterm = useMemo(
    () => pickBySeed(relationshipTips[lang], submittedText || caseText || "tip", 9),
    [lang, submittedText, caseText]
  );
  const currentIcebreaker = analysis?.icebreaker ? analysis.icebreaker[lang] : fallbackIcebreaker;
  const currentLongterm = analysis?.longterm ? analysis.longterm[lang] : fallbackLongterm;

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
