import { motion } from 'framer-motion'
import { ArrowUpRight, Plus, Check, Leaf, Box, Globe, Camera, Home, ShoppingBag, Briefcase, FileText, Mail } from 'lucide-react'
import { useState } from 'react'

// Color palette from Framer template
const colors = {
  background: '#000000',
  surface: '#1c1c1c',
  surfaceDark: '#141414',
  surfaceDarker: '#0f0f0f',
  accent: '#CAE8BD',
  border: 'rgba(255, 255, 255, 0.08)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  white: '#ffffff',
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Floating Navigation Component
function FloatingNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  const navItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: ShoppingBag, label: 'Shop', href: '#shop' },
    { icon: Briefcase, label: 'Work', href: '#work' },
    { icon: FileText, label: 'Blog', href: '#blog' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 8px 24px 0px, rgba(255, 255, 255, 0.04) 0px -8px 24px 0px',
        }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index

          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              <Icon
                size={20}
                className="sm:hidden"
                style={{
                  color: isActive ? colors.white : colors.textMuted,
                }}
              />
              <Icon
                size={22}
                className="hidden sm:block"
                style={{
                  color: isActive ? colors.white : colors.textMuted,
                }}
              />
            </motion.a>
          )
        })}
      </div>
    </motion.nav>
  )
}

// Section Header Component
function SectionHeader({
  title,
  count,
  seeAllLink
}: {
  title: string
  count?: number
  seeAllLink?: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {count && (
          <span style={{ color: colors.textMuted }} className="text-xs sm:text-sm">({count})</span>
        )}
      </div>
      <div className="hidden sm:block flex-1 h-px" style={{ backgroundColor: colors.border }} />
      {seeAllLink && (
        <a href={seeAllLink} className="text-xs sm:text-sm hover:text-white/80 transition-colors">
          See all
        </a>
      )}
    </div>
  )
}

// Badge Component
function Badge({ children }: { children: string }) {
  return (
    <span
      className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-full backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${colors.border}`
      }}
    >
      {children}
    </span>
  )
}

// Primary Button Component
function PrimaryButton({ children, href = '#' }: { children: string; href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative block w-full py-2.5 sm:py-3 px-4 sm:px-6 text-center font-medium text-black rounded-3xl overflow-hidden text-sm sm:text-base"
      style={{ backgroundColor: colors.accent }}
    >
      {children}
    </motion.a>
  )
}

// Project Card Component
function ProjectCard({
  title,
  description,
  image,
  logo,
  badges,
  href = '#'
}: {
  title: string
  description: string
  image: string
  logo: string
  badges: string[]
  href?: string
}) {
  return (
    <motion.a
      href={href}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="block"
    >
      <div
        className="rounded-xl sm:rounded-2xl overflow-hidden p-px"
        style={{ border: `1px solid ${colors.border}` }}
      >
        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />

          {/* Logo overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 sm:w-1/3 opacity-90">
            <img src={logo} alt={`${title} logo`} className="w-full h-auto" />
          </div>

          {/* Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <Badge>{badges.join(', ')}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
        <p style={{ color: colors.textMuted }} className="text-xs sm:text-sm">{description}</p>
      </div>
    </motion.a>
  )
}

// Projects Section
function Projects() {
  const projects = [
    {
      title: 'Halo',
      description: 'Reworking a brand and building a website that grows with it.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      logo: 'https://framerusercontent.com/images/RJcCG4dgT1LbfvrMoDzACIBap4.png',
      badges: ['Identity', 'Development']
    },
    {
      title: 'Meridian',
      description: 'A fresh identity for a brand that needed clarity and confidence.',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
      logo: 'https://framerusercontent.com/images/g28Q0l1fkWXQ0uF5sAsDpjOQqE.png',
      badges: ['Identity', 'Design']
    }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="Projects" count={7} seeAllLink="#" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </motion.div>
    </section>
  )
}

// Service Card Component
function ServiceCard({
  number,
  title,
  description,
  icon: Icon
}: {
  number: string
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="rounded-xl sm:rounded-2xl p-0.5 sm:p-1"
      style={{ backgroundColor: colors.surface }}
    >
      <div
        className="rounded-lg sm:rounded-xl p-4 sm:p-6 h-full"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span style={{ color: colors.textMuted }} className="text-xs sm:text-sm font-medium">{number}.</span>
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.surface }}
          >
            <Icon size={16} className="sm:hidden" style={{ color: colors.accent }} />
            <Icon size={20} className="hidden sm:block" style={{ color: colors.accent }} />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{title}</h3>
        <p style={{ color: colors.textMuted }} className="text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// Solutions Section
function Solutions() {
  const services = [
    {
      number: '01',
      title: 'Logos and brand identity',
      description: 'Creating visual identities that make your brand memorable.',
      icon: Leaf
    },
    {
      number: '02',
      title: '3D Product Design',
      description: 'Turning complex ideas into 3D digital products people love.',
      icon: Box
    },
    {
      number: '03',
      title: 'Websites',
      description: 'Strategic, beautiful websites that achieve your business goals.',
      icon: Globe
    },
    {
      number: '04',
      title: 'Photography',
      description: 'Building scalable design foundations that keep your product consistent.',
      icon: Camera
    }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="Solutions" count={4} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {services.map((service) => (
          <ServiceCard key={service.number} {...service} />
        ))}
      </motion.div>
    </section>
  )
}

// Product Card Component
function ProductCard({
  title,
  subtitle,
  price,
  image,
  href = '#'
}: {
  title: string
  subtitle: string
  price: string
  image: string
  href?: string
}) {
  return (
    <motion.a
      href={href}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="block"
    >
      <div
        className="rounded-xl sm:rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${colors.border}` }}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
          <p style={{ color: colors.textMuted }} className="text-xs sm:text-sm">{subtitle}</p>
        </div>
        <Badge>{price}</Badge>
      </div>
    </motion.a>
  )
}

// Digital Goods Section
function DigitalGoods() {
  const products = [
    {
      title: 'Guidy',
      subtitle: 'Brand Book Template',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80'
    },
    {
      title: 'Feature',
      subtitle: 'SaaS template',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="Digital goods" count={6} seeAllLink="#" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </motion.div>
    </section>
  )
}

// Logo Ticker
function LogoTicker() {
  const logos = ['Dribbble', 'Mailchimp', 'Notion', 'Spotify', 'Booking']

  return (
    <section className="py-8 sm:py-12 overflow-hidden">
      <motion.div
        className="flex gap-12 sm:gap-24"
        animate={{ x: [0, -500] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <span
            key={i}
            className="text-lg sm:text-2xl font-semibold whitespace-nowrap"
            style={{ color: colors.textMuted }}
          >
            {logo}
          </span>
        ))}
      </motion.div>
    </section>
  )
}

// Blog Item Component
function BlogItem({
  title,
  date,
  readTime,
  href = '#'
}: {
  title: string
  date: string
  readTime: string
  href?: string
}) {
  return (
    <motion.a
      href={href}
      variants={fadeInUp}
      whileHover={{ x: 4 }}
      className="group flex items-center justify-between py-4 sm:py-5"
      style={{ borderBottom: `1px solid ${colors.border}` }}
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="font-semibold mb-1 sm:mb-2 group-hover:text-white/80 transition-colors text-sm sm:text-base truncate sm:whitespace-normal">{title}</h3>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm" style={{ color: colors.textMuted }}>
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.textMuted }} />
          <span>{readTime}</span>
        </div>
      </div>
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        style={{ border: `1px solid ${colors.border}` }}
      >
        <ArrowUpRight size={16} className="sm:hidden" />
        <ArrowUpRight size={18} className="hidden sm:block" />
      </div>
    </motion.a>
  )
}

// Blog Section
function Blog() {
  const posts = [
    { title: 'Turning critique into creative opportunities', date: 'Oct 24, 2025', readTime: '2 min' },
    { title: 'Creating compelling narratives through design', date: 'Oct 20, 2025', readTime: '4 min' },
    { title: 'Tools and techniques for better productivity', date: 'Oct 8, 2025', readTime: '1 min' },
    { title: 'Choosing the right fonts for your design projects', date: 'Sep 24, 2025', readTime: '2 min' },
    { title: 'How to create inclusive user experiences', date: 'Sep 15, 2025', readTime: '3 min' }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="From the blog" count={5} seeAllLink="#" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {posts.map((post) => (
          <BlogItem key={post.title} {...post} />
        ))}
      </motion.div>
    </section>
  )
}

// Testimonial Card Component
function TestimonialCard({
  name,
  handle,
  avatar,
  text
}: {
  name: string
  handle: string
  avatar: string
  text: string
}) {
  return (
    <motion.a
      href="#"
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="block rounded-xl sm:rounded-2xl p-4 sm:p-6"
      style={{ backgroundColor: colors.surfaceDark }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <img src={avatar} alt={name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
        <div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-medium text-xs sm:text-sm">{name}</span>
            <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 fill-blue-400">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>{handle}</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm leading-relaxed">{text}</p>
    </motion.a>
  )
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: 'Juno C.',
      handle: '@juno123',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
      text: 'Ezio just gets it. Clean design, smart structure, and an eye for detail that makes everything feel intentional.'
    },
    {
      name: 'Nina S.',
      handle: '@ninas95',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop',
      text: 'Working with Ezio was one of the best creative decisions we made this year. He took our scattered ideas and turned them into a cohesive digital experience.'
    },
    {
      name: 'Jordan P.',
      handle: '@jordanp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
      text: 'Ezio is a designer who actually listens. Every round of feedback felt understood and reflected in the next version.'
    },
    {
      name: 'Lucas M.',
      handle: '@lucasm',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop',
      text: 'Found Ezio through one of his Framer templates and was instantly impressed. The final site feels effortless — light, modern, and exactly on-brand.'
    },
    {
      name: 'Marc K.',
      handle: '@kuipermarc',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop',
      text: 'Our website used to feel clunky and outdated. Ezio gave it a total transformation — cleaner layout, faster load time.'
    },
    {
      name: 'Samantha R.',
      handle: '@samanthar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop',
      text: 'Sharp, reliable, and full of good taste. Ezio is the kind of creative you can trust to deliver without micromanaging.'
    }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="What others say" count={6} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.handle} {...testimonial} />
        ))}
      </motion.div>
    </section>
  )
}

// Pricing Card Component
function PricingCard({
  title,
  description,
  price,
  period,
  features
}: {
  title: string
  description: string
  price: string
  period: string
  features: string[]
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
      style={{ backgroundColor: colors.surfaceDark }}
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
        <p style={{ color: colors.textMuted }} className="text-xs sm:text-sm">{description}</p>
      </div>

      <div className="mb-4 sm:mb-6">
        <span className="text-xs" style={{ color: colors.textMuted }}>From</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-semibold">{price}</span>
          <span className="text-sm" style={{ color: colors.textMuted }}>/{period}</span>
        </div>
      </div>

      <PrimaryButton>Book a call</PrimaryButton>

      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 sm:gap-3">
            <Check size={16} className="sm:hidden" style={{ color: colors.accent }} />
            <Check size={18} className="hidden sm:block" style={{ color: colors.accent }} />
            <span className="text-xs sm:text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      title: 'Per project',
      description: 'For clients seeking a professionally designed website with no recurring costs.',
      price: '$5000',
      period: 'project',
      features: ['One-time investment', 'Full ownership', 'Get all the design files']
    },
    {
      title: 'Monthly',
      description: 'For clients who want ongoing design updates and support.',
      price: '$2500',
      period: 'month',
      features: ['Lower upfront cost', 'Monthly updates and support', 'Easily add new features']
    }
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="Pricing" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </motion.div>
    </section>
  )
}

// FAQ Item Component
function FAQItem({ question }: { question: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl sm:rounded-2xl overflow-hidden"
      style={{ backgroundColor: colors.surfaceDark }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
      >
        <span className="font-medium pr-3 sm:pr-4 text-sm sm:text-base">{question}</span>
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: colors.background }}
        >
          <Plus
            size={16}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4 sm:px-5 sm:pb-5"
        >
          <p style={{ color: colors.textMuted }} className="text-xs sm:text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// FAQ Section
function FAQ() {
  const questions = [
    'What types of digital products do you design?',
    'What is your design process like?',
    'What is your typical timeline for projects?',
    'What do you need from me to get started?',
    'How do you handle revisions and feedback?',
    'What is your communication style during projects?'
  ]

  return (
    <section className="py-10 sm:py-16">
      <SectionHeader title="Most asked questions" count={6} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2 sm:space-y-3"
      >
        {questions.map((question) => (
          <FAQItem key={question} question={question} />
        ))}
      </motion.div>
    </section>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      <FloatingNav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <Projects />
        <Solutions />
        <DigitalGoods />
        <LogoTicker />
        <Blog />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
    </div>
  )
}

export default App
