// 生成一个不会重复的ID
function getRandomID() {
    return Math.random().toString(16).slice(2);
}



const data = [
    {
        id: getRandomID(),
        status: 'finish',
        content: '需要视频中的资料可以在下方评论（学习），我私信百度云盘的链接给你',
        lastFinishTime: '2023.08.05 16:34'
    },
    {
        id: getRandomID(),
        status: 'unfinished',
        content: '课程已经完结，大家可以放心观看',
        lastFinishTime: ''
    },
    {
        id: getRandomID(),
        status: 'finish',
        content: '怎么感觉少了点东西呀，P58和P59不衔接，up组有P58后面的缺少的视频吗？感觉讲的很好',
        lastFinishTime: '2023.08.05 16:34'
    },
    {
        id: getRandomID(),
        status: 'unfinished',
        content: '已经三连，求系统的学习资料',
        lastFinishTime: ''
    },
    {
        id: getRandomID(),
        status: 'finish',
        content: '英雄联盟12周年盛典 LPL夏季赛总决赛',
        lastFinishTime: '2023.08.05 16:34'
    },
    {
        id: getRandomID(),
        status: 'unfinished',
        content: '感觉现在大家对冠军苦无的看法分为激进派和保守派两个极端，激进派会用激烈的言语去在各个平台攻击这把刀，而保守派则会认为激进派的攻击太保守了',
        lastFinishTime: ''
    }
]