import { motion } from 'motion/react'
import { Link } from 'react-router'
import Button from '../components/ui/Button'

const VALUES = [
  { icon: '🌿', title: '天然成分', desc: '每一款皂的配方都經過嚴格把關，採用來自台灣小農的冷壓植物油，不含 SLS、SLES、人工香精與石化衍生成分。' },
  { icon: '✋', title: '冷製工藝', desc: '以傳統冷製皂化法製作，全程低溫保留油脂的天然甘油與養分。每塊皂至少熟成四至六週，等待時間成就最好的質地。' },
  { icon: '🌍', title: '永續包裝', desc: '全面採用可回收牛皮紙與無漂白棉繩包裝，拒絕塑料氣泡袋。每年種植與包裝用紙等量的樹苗，回饋大地。' },
  { icon: '💛', title: '在地製造', desc: '工作室設於台北，每一塊皂都在這裡誕生。我們相信在地製造是對環境最好的選擇，也讓我們對每一步工序負責。' },
]

const TEAM = [
  { name: 'Sophie Chen', role: '創辦人 / 配方師', bio: '十年芳療師資歷，以對天然成分的熱愛創立 Pure & Co.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Liam Wu',     role: '製皂工匠',       bio: '師承日本皂藝職人，精通多種皂化技法，負責研發新配方與品質把關。', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Mia Lin',     role: '設計與包裝',     bio: '平面設計背景，負責品牌視覺與包裝設計，讓包裝本身就是一份禮物。', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
]

export default function About() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background: 'var(--color-dark)' }}>
        <div className="container-page py-14 md:py-20">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2 md:order-1">
              <p className="text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-terra-light)' }}>Our Story</p>
              <h1 className="font-serif font-normal mb-5 leading-[1.05]"
                style={{ fontSize: 'clamp(32px, 5vw, 58px)', color: 'var(--color-cream)' }}>
                從一鍋皂液，<br />
                <em style={{ color: 'var(--color-sage-light)' }}>到千份純粹</em>
              </h1>
              <p className="text-sm leading-relaxed max-w-md mx-auto md:mx-0"
                style={{ color: 'rgba(240,230,214,0.72)' }}>
                Pure & Co. 的故事始於 2018 年的一個廚房，創辦人 Sophie 因為找不到真正天然、不刺激肌膚的手工皂，
                決定自己動手學習製皂工藝。從那一鍋改變一切的皂液開始，我們走到今天。
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }} className="order-1 md:order-2 w-full">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" alt="製皂工作室"
                className="w-full object-cover" style={{ aspectRatio: '4/3', filter: 'brightness(0.65)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-20" style={{ background: 'var(--color-cream)' }}>
        <div className="container-page text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>We Believe In</p>
          <h2 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--color-dark)' }}>我們的核心理念</h2>
          <div className="section-divider mb-10 md:mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 text-left p-5 md:p-6"
                style={{ background: 'var(--color-cream-2)', border: '1px solid var(--color-border)' }}>
                <span className="text-2xl md:text-3xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-serif text-base md:text-lg font-medium mb-1.5" style={{ color: 'var(--color-dark)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-2)' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20" style={{ background: 'var(--color-cream-2)' }}>
        <div className="container-page text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>Craft</p>
          <h2 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-dark)' }}>製作工藝</h2>
          <div className="section-divider mb-10 md:mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: '原料選購', desc: '直接向台灣有機農場採購植物油，確認來源可追溯，品質透明。' },
              { step: '02', title: '冷製皂化', desc: '將油脂與鹼液以低溫工法混合，保留天然甘油與油脂養分。' },
              { step: '03', title: '入模熟成', desc: '每塊皂靜置最少四週，直到皂化完全、質地穩定。' },
              { step: '04', title: '手切包裝', desc: '手工切割成型，以環保牛皮紙逐一包裝，附成分卡出貨。' },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--color-cream-3)' }}>{s.step}</p>
                <h3 className="font-serif text-sm md:text-base font-medium mb-2" style={{ color: 'var(--color-dark)' }}>{s.title}</h3>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-2)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 md:py-20" style={{ background: 'var(--color-cream)' }}>
        <div className="container-page text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>The Team</p>
          <h2 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-dark)' }}>製皂背後的人</h2>
          <div className="section-divider mb-10 md:mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {TEAM.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="overflow-hidden mx-auto mb-4"
                  style={{ width: '120px', height: '120px', borderRadius: '50%' }}>
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-base md:text-lg font-medium mb-0.5" style={{ color: 'var(--color-dark)' }}>{member.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-terra)' }}>{member.role}</p>
                <p className="text-xs md:text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--color-text-2)' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 text-center" style={{ background: 'var(--color-brown)' }}>
        <div className="container-page">
          <h2 className="font-serif font-normal mb-2" style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-cream)' }}>
            一起感受純粹的力量
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(250,246,240,0.75)' }}>
            探索我們的手工皂系列，為日常洗護注入自然的溫度
          </p>
          <Link to="/shop">
            <Button size="lg"
              style={{ background: 'var(--color-cream)', color: 'var(--color-brown)', borderColor: 'var(--color-cream)' }}>
              探索商品
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
