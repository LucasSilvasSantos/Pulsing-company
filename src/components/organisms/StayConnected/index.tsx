import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import {
  LuInstagram,
  LuLinkedin,
  LuTwitter,
  LuYoutube,
} from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { Logo } from '@/components/atoms/Logo'
import { PillForm } from '@/components/molecules/PillForm'
import { SocialIcon } from '@/components/molecules/SocialIcon'
import { ContactCol } from '@/components/molecules/ContactCol'
import { Toast } from '@/components/molecules/Toast'
import { fadeUp, viewport } from '@/lib/motion'

const socials = [
  { icon: <LuInstagram />, label: 'Instagram da Pulsing', href: '#' },
  { icon: <LuLinkedin />, label: 'LinkedIn da Pulsing', href: '#' },
  { icon: <LuTwitter />, label: 'X (Twitter) da Pulsing', href: '#' },
  { icon: <LuYoutube />, label: 'YouTube da Pulsing', href: '#' },
  { icon: <FaWhatsapp />, label: 'WhatsApp da Pulsing', href: '#' },
]

export function StayConnected() {
  const [showToast, setShowToast] = useState(false)

  const handleFormSuccess = () => {
    setShowToast(true)
  }

  return (
    <section id="connected" className="border-t border-line" style={{ padding: '100px 28px 60px' }}>
      <div className="container-pulsing">
        <motion.h2
          className="font-sans font-semibold text-fg leading-[1.02] tracking-[-0.04em] mb-14"
          style={{ fontSize: 'clamp(36px, 4.8vw, 56px)' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Vamos{' '}
          <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
            conversar.
          </em>
        </motion.h2>

        {/* 4-column grid */}
        <motion.div
          className="grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {/* Col 1: Nova conta */}
          <motion.div variants={fadeUp} custom={0} className="flex flex-col gap-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3">
              Nova conta
            </h4>
            <p className="text-[13px] text-fg-3 leading-[1.6]">
              Conte em uma linha o que você precisa resolver. Respondemos em até 24h úteis.
            </p>
            <PillForm
              placeholder="Seu e-mail"
              buttonLabel="Enviar"
              onSuccess={handleFormSuccess}
            />
          </motion.div>

          {/* Col 2: Contato */}
          <motion.div variants={fadeUp} custom={1}>
            <ContactCol title="Contato">
              <a
                href="mailto:hello@pulsing.co"
                className="text-[13px] text-fg-2 hover:text-accent transition-colors duration-200"
              >
                hello@pulsing.co
              </a>
              <a
                href="mailto:novosnegocios@pulsing.co"
                className="text-[13px] text-fg-2 hover:text-accent transition-colors duration-200"
              >
                novosnegocios@pulsing.co
              </a>
              <a
                href="#"
                className="text-[13px] text-fg-2 hover:text-accent transition-colors duration-200 inline-flex items-center gap-1"
              >
                WhatsApp ↗
              </a>
            </ContactCol>
          </motion.div>

          {/* Col 3: Operação */}
          <motion.div variants={fadeUp} custom={2}>
            <ContactCol title="Operação">
              <span className="text-[13px] text-fg-3">Brasil · remoto</span>
              <span className="text-[13px] text-fg-3">Seg–Sex · 09h–19h BRT</span>
              <span className="text-[13px] text-fg-3">SLA · 24h úteis</span>
            </ContactCol>
          </motion.div>

          {/* Col 4: Sociais */}
          <motion.div variants={fadeUp} custom={3}>
            <ContactCol title="Siga a Pulsing">
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <SocialIcon key={s.label} icon={s.icon} href={s.href} label={s.label} />
                ))}
              </div>
            </ContactCol>
          </motion.div>
        </motion.div>

        {/* Footer bar */}
        <div className="mt-20 pt-7 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
            <span className="font-sans text-[13px] text-fg-3">Pulsing™ · 2026</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-4">
            Marketing que pulsa resultados
          </span>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-4">
            <a href="#" className="hover:text-fg-2 transition-colors duration-200">Privacidade</a>
            <span className="text-line">·</span>
            <a href="#" className="hover:text-fg-2 transition-colors duration-200">Termos</a>
            <span className="text-line">·</span>
            <a href="#" className="hover:text-fg-2 transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message="Recebido. Retornamos em até 24h úteis."
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
