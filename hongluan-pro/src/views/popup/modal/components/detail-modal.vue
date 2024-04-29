<template>
  <hl-panel padding="var(--xl)" class="card-panel">
    <template #header>
      <div class="panel-title"><h4>详情类模态窗</h4></div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <hl-icon><two-more /></hl-icon>
        </hl-button>
      </div>
    </template>
    <hl-group full="full-x" class="p-b-lg">详情类模态窗可以不离开当前页面，方便快速的预览当前信息的详情内容，并且无需当心失去之前的阅读焦点。</hl-group>
    <hl-button class="m-r-md" @click="modal1 = true">标准模态窗</hl-button>
    <hl-button class="m-r-md" @click="modal2 = true">超长模态窗</hl-button>
    <hl-button class="m-r-md" @click="modal3 = true">面板内滚动</hl-button>
  </hl-panel>

  <hl-dialog v-model="modal1" title="Modal Title" :borderless="true" width="calc(var(--xxl) * 13)" padding="var(--xl)">
    <hl-group dir="vertical">
      <hl-thumb full class="m-b-md" radius fit="cover" src="https://assets-global.website-files.com/5bfd6f4468ee7943c2d331dd/5f86e31759dadc8ffa85ca8d_small%20(1).jpg" />
      <p style="line-height: 2">
        习近平指出，设立可持续发展大数据国际研究中心是我在第75届联合国大会上宣布的支持落实联合国2030年可持续发展议程的重要举措。2030年议程为各国发展和国际发展合作提出了明确目标。当前，世界正遭受新冠肺炎疫情巨大冲击，科技创新和大数据应用将有利于推动国际社会克服困难、在全球范围内落实2030年议程。
      </p>
    </hl-group>

    <hl-group gap="var(--md)" class="m-t-lg">
      <hl-button effect="light" icon-position="left">
        12
        <template #icon>
          <hl-icon><fill-message /></hl-icon>
        </template>
      </hl-button>

      <hl-button type="danger" effect="light" icon-position="left">
        150
        <template #icon>
          <hl-icon><fill-heart /></hl-icon>
        </template>
      </hl-button>
    </hl-group>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="modal1 = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>

  <hl-dialog v-model="modal2" title="Modal Title" :borderless="true" width="calc(var(--xxl) * 13)" padding="var(--xl)" header-class="h-auto p-y-lg">
    <template #header>
      <hl-group dir="vertical" full="full-x" gap="var(--xs)">
        <h3 class="title">习近平向可持续发展大数据国际论坛致贺信</h3>
        <hl-group>
          <span class="text-light font-sm">202.-09.06 11:25:26　</span>
          <span class="text-light font-sm font-bold">来源: 新华网</span>
        </hl-group>
      </hl-group>
    </template>
    <div style="line-height: 2">
      <p class="indent">新华社北京9月6日电9月6日，国家主席习近平向可持续发展大数据国际研究中心成立大会暨2021年可持续发展大数据国际论坛致贺信。</p>
      <p class="indent">
        当天，社交网络平台推特上的粉丝问马斯克：“美国总统甚至拒绝承认帮助圣裘德儿童研究医院筹集了数亿美元资金的4名最新美国宇航员身份，对此你有何看法？”马斯克简单回应：“他还在睡觉！”白宫和SpaceX没有立即回复置评请求。
      </p>
      <p class="indent">正如之前有媒体报道的那样，SpaceX发射首次纯商业载人太空飞行任务的载人龙飞船已经从轨道上安全地返回地面。在太空飞行三天后，这艘飞船将Inspiration4任务的四名成员带回了地球。</p>
      <p class="indent">
        Inspiration4任务的一个主要目标是为圣裘德儿童研究医院筹集2亿美元资金。截至当地时间周六，该项目已经筹资1.602亿美元。在Inspiration4落地后的庆祝活动中，马斯克承诺个人捐赠5000万美元，将这次筹资活动的总筹资额推高至2.1亿美元。
      </p>
      <p class="indent">
        美国宇航局（NASA）高级官员祝贺马斯克和SpaceX完成Inspiration4任务。SpaceX的竞争对手也承认了其取得的成就，包括波音、洛克希德·马丁、蓝色起源等公司。同时，马斯克的同行兼竞争对手杰夫·贝索斯（Jeff
        Bezos）也在社交媒体上发声称赞。
      </p>
      <p class="indent">
        这标志着首次由非专业人员组成的私人团队完成太空飞行。此外，这项任务还创造了许多纪录，比如有首位担任飞行员的黑人女性，迄今为止成为宇航员的最年轻美国人，以及首位带着假肢在太空飞行的人。
      </p>
      <p class="indent">
        尽管马斯克最近表示，他“更愿意置身于政治之外”，但他在周日发表的评论表明，他对这位民主党总统深感不满，并乐意见到右翼对拜登的嘲讽。在2020年的竞选期间，前总统唐纳德·特朗普(Donald
        Trump)经常辱骂当时的候选人拜登，称他为“昏昏欲睡的乔”(Sleepy Joe)。
      </p>
      <p class="indent">
        最近，特朗普在6月份与俄罗斯总统弗拉基米尔·普京(Vladimir
        Putin)举行峰会之前，向拜登送上了讽刺的祝福。他当时在一份电子邮件声明中说：“祝拜登在与普京总统打交道时好运，不要在会晤期间打瞌睡，请代我向他致以最热烈的问候！”
      </p>
      <p class="indent">
        SpaceX与美国联邦政府保持着良好的关系。例如，它击败了蓝色起源和国防承包商Dynetics赢得了价值28.9亿美元的合同，建造NASA载人月球着陆器。到目前为止，SpaceX已经为NASA运送了10名宇航员前往国际空间站。然而，SpaceX也在接受美国司法部的调查，此前该公司被控歧视求职者。这项调查始于特朗普政府时期。
      </p>
      <p class="indent">
        除了在SpaceX的职责外，马斯克还兼任电动汽车制造商特斯拉的首席执行官。以这种身份，他最近哀叹拜登政府的一项提议，该提议将向某些新型电动轻型乘用车的购买者额外提供4500美元补贴，前提是这些电动汽车在美国国内由工会工人制造。
      </p>
      <p class="indent">虽然特斯拉在内华达州经营着电池工厂，在加州设有汽车组装厂，得萨斯州奥斯汀郊外的超级工厂也在建设中，但特斯拉是唯一家在美国生产汽车而没有成立工会的美国大型汽车制造商。</p>
      <p class="indent">9月12日，马斯克在推特上谈到这项提议时说：“这是福特和美国汽车工会的游说者帮助起草的，而他们在墨西哥制造电动汽车，这对美国纳税人来说并没有明显的好处！”</p>
      <p class="indent">在美国著名汽车网站Cars.com发布的2021年年度美国制造指数中，特斯拉广受欢迎的Model 3电动轿车位居榜首，其跨界车Model Y位居第三。</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="modal2 = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>

  <hl-dialog v-model="modal3" title="Modal Title" width="calc(var(--xxl) * 13)" height="calc(var(--xxl) * 15)" padding="var(--xl)" header-class="h-auto p-y-lg" full-body>
    <template #header>
      <hl-group dir="vertical" full="full-x" gap="var(--xs)">
        <h3 class="title">习近平向可持续发展大数据国际论坛致贺信</h3>
        <hl-group>
          <span class="text-light font-sm">2021-09-06 11:25:26　</span>
          <span class="text-light font-sm font-bold">来源: 新华网</span>
        </hl-group>
      </hl-group>
    </template>
    <div class="p-xl" style="line-height: 2">
      <p class="indent">新华社北京9月6日电9月6日，国家主席习近平向可持续发展大数据国际研究中心成立大会暨2021年可持续发展大数据国际论坛致贺信。</p>
      <p class="indent">
        当天，社交网络平台推特上的粉丝问马斯克：“美国总统甚至拒绝承认帮助圣裘德儿童研究医院筹集了数亿美元资金的4名最新美国宇航员身份，对此你有何看法？”马斯克简单回应：“他还在睡觉！”白宫和SpaceX没有立即回复置评请求。
      </p>
      <p class="indent">正如之前有媒体报道的那样，SpaceX发射首次纯商业载人太空飞行任务的载人龙飞船已经从轨道上安全地返回地面。在太空飞行三天后，这艘飞船将Inspiration4任务的四名成员带回了地球。</p>
      <p class="indent">
        Inspiration4任务的一个主要目标是为圣裘德儿童研究医院筹集2亿美元资金。截至当地时间周六，该项目已经筹资1.602亿美元。在Inspiration4落地后的庆祝活动中，马斯克承诺个人捐赠5000万美元，将这次筹资活动的总筹资额推高至2.1亿美元。
      </p>
      <p class="indent">
        美国宇航局（NASA）高级官员祝贺马斯克和SpaceX完成Inspiration4任务。SpaceX的竞争对手也承认了其取得的成就，包括波音、洛克希德·马丁、蓝色起源等公司。同时，马斯克的同行兼竞争对手杰夫·贝索斯（Jeff
        Bezos）也在社交媒体上发声称赞。
      </p>
      <p class="indent">
        这标志着首次由非专业人员组成的私人团队完成太空飞行。此外，这项任务还创造了许多纪录，比如有首位担任飞行员的黑人女性，迄今为止成为宇航员的最年轻美国人，以及首位带着假肢在太空飞行的人。
      </p>
      <p class="indent">
        尽管马斯克最近表示，他“更愿意置身于政治之外”，但他在周日发表的评论表明，他对这位民主党总统深感不满，并乐意见到右翼对拜登的嘲讽。在2020年的竞选期间，前总统唐纳德·特朗普(Donald
        Trump)经常辱骂当时的候选人拜登，称他为“昏昏欲睡的乔”(Sleepy Joe)。
      </p>
      <p class="indent">
        最近，特朗普在6月份与俄罗斯总统弗拉基米尔·普京(Vladimir
        Putin)举行峰会之前，向拜登送上了讽刺的祝福。他当时在一份电子邮件声明中说：“祝拜登在与普京总统打交道时好运，不要在会晤期间打瞌睡，请代我向他致以最热烈的问候！”
      </p>
      <p class="indent">
        SpaceX与美国联邦政府保持着良好的关系。例如，它击败了蓝色起源和国防承包商Dynetics赢得了价值28.9亿美元的合同，建造NASA载人月球着陆器。到目前为止，SpaceX已经为NASA运送了10名宇航员前往国际空间站。然而，SpaceX也在接受美国司法部的调查，此前该公司被控歧视求职者。这项调查始于特朗普政府时期。
      </p>
      <p class="indent">
        除了在SpaceX的职责外，马斯克还兼任电动汽车制造商特斯拉的首席执行官。以这种身份，他最近哀叹拜登政府的一项提议，该提议将向某些新型电动轻型乘用车的购买者额外提供4500美元补贴，前提是这些电动汽车在美国国内由工会工人制造。
      </p>
      <p class="indent">虽然特斯拉在内华达州经营着电池工厂，在加州设有汽车组装厂，得萨斯州奥斯汀郊外的超级工厂也在建设中，但特斯拉是唯一家在美国生产汽车而没有成立工会的美国大型汽车制造商。</p>
      <p class="indent">9月12日，马斯克在推特上谈到这项提议时说：“这是福特和美国汽车工会的游说者帮助起草的，而他们在墨西哥制造电动汽车，这对美国纳税人来说并没有明显的好处！”</p>
      <p class="indent">在美国著名汽车网站Cars.com发布的2021年年度美国制造指数中，特斯拉广受欢迎的Model 3电动轿车位居榜首，其跨界车Model Y位居第三。</p>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="modal3 = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const modal1 = ref(false)
    const modal2 = ref(false)
    const modal3 = ref(false)

    return {
      modal1,
      modal2,
      modal3,
    }
  },
})
</script>
