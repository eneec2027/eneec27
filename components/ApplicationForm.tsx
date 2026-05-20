'use client'

import { useState, useTransition } from 'react'
import { useForm, useWatch, Controller, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, type ApplicationInput } from '@/lib/applicationSchema'
import { SECTORS, SECTOR_SLUGS, SECTOR_QUESTIONS, type Sector } from '@/lib/sectors'
import { UNIVERSITIES, COURSES } from '@/lib/formOptions'
import { SectorDnD } from '@/components/SectorDnD'
import { submitApplication, checkEmailExists } from '@/app/actions/apply'
import { cn } from '@/lib/utils'

// ─── Shared primitives ───────────────────────────────────────────────────────

const inputBase = "w-full px-4 py-2.5 bg-[#0d1220]/90 border text-sm text-foreground placeholder:text-muted-foreground/25 focus:outline-none transition-colors mono rounded-sm"
const inputCls  = cn(inputBase, 'border-gold/10 focus:border-gold/35')
function inputErr(hasError: boolean) {
  return cn(inputBase, hasError
    ? 'border-red-500/60 focus:border-red-500 bg-red-950/20'
    : 'border-gold/10 focus:border-gold/35'
  )
}

const labelCls = "mono text-[0.58rem] text-gold/50 tracking-[0.2em] uppercase block mb-1.5"
const errorCls = "mt-1.5 text-xs text-red-400 mono"

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null
  return (
    <p
      id={id}
      data-field-error
      role="alert"
      aria-live="polite"
      className={errorCls}
    >
      {msg}
    </p>
  )
}

function RadioSet<T extends string | boolean>({
  options,
  value,
  onChange,
  error,
  errorId,
}: {
  options: { label: string; value: T }[]
  value: T | undefined
  onChange: (v: T) => void
  error?: string
  errorId?: string
}) {
  return (
    <div
      className="space-y-1"
      role="group"
      aria-invalid={!!error}
      aria-describedby={error && errorId ? errorId : undefined}
    >
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-4 py-2 border rounded-sm text-xs mono transition-all',
              value === opt.value
                ? 'border-gold/60 bg-gold/10 text-gold'
                : 'border-white/10 text-foreground/50 hover:border-gold/25 hover:text-foreground/70'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && (
        <p id={errorId} data-field-error role="alert" aria-live="polite" className={errorCls}>
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const steps = ['Perfil', 'Motivação', 'Perguntas']
  return (
    <div className="mb-10">
      <div className="flex items-center gap-0">
        {steps.map((label, i) => {
          const n = i + 1
          const active  = step === n
          const done    = step > n
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'w-7 h-7 rounded-full border flex items-center justify-center mono text-xs font-bold transition-all',
                  done   ? 'bg-gold border-gold text-[#080c14]' :
                  active ? 'border-gold text-gold bg-gold/10'   :
                           'border-white/10 text-muted-foreground/30'
                )}>
                  {done ? '✓' : n}
                </div>
                <span className={cn(
                  'mono text-[0.5rem] tracking-[0.2em] uppercase',
                  active ? 'text-gold/80' : done ? 'text-gold/40' : 'text-muted-foreground/25'
                )}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-px mx-2 mb-5',
                  step > n ? 'bg-gold/40' : 'bg-white/8'
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Phone formatter ─────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  // Strip country code prefix (00351 or 351)
  const local = digits.startsWith('00351') ? digits.slice(5)
              : digits.startsWith('351') && digits.length > 9 ? digits.slice(3)
              : digits

  const hasCountry = local !== digits
  const d = local.slice(0, 9)
  const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9)].filter(Boolean)
  return hasCountry ? `+351 ${parts.join(' ')}`.trimEnd() : parts.join(' ')
}

// ─── Step 1: Perfil ───────────────────────────────────────────────────────────

type AppForm = UseFormReturn<ApplicationInput, unknown, ApplicationInput>

function Step1({ form }: { form: AppForm }) {
  const { register, control, formState: { errors } } = form
  const hasXp = useWatch({ control, name: 'has_event_xp' })

  return (
    <div className="space-y-6">
      <div>
        <p className="mono text-[0.58rem] text-gold/40 tracking-[0.25em] uppercase mb-6">
          Bloco 1 — Perfil Geral
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label htmlFor="full_name" className={labelCls}>Nome completo</label>
            <input
              id="full_name"
              {...register('full_name')}
              placeholder="O teu nome completo"
              className={inputErr(!!errors.full_name)}
              aria-invalid={!!errors.full_name}
              aria-describedby={errors.full_name ? 'err-full_name' : undefined}
            />
            <FieldError id="err-full_name" msg={errors.full_name?.message} />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>Email</label>
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="o.teu@email.pt"
              className={inputErr(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            <FieldError id="err-email" msg={errors.email?.message} />
          </div>

          <div>
            <label htmlFor="phone" className={labelCls}>Telemóvel</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  id="phone"
                  value={field.value}
                  onChange={e => field.onChange(formatPhone(e.target.value))}
                  onBlur={field.onBlur}
                  type="tel"
                  placeholder="+351 912 345 678"
                  inputMode="tel"
                  className={inputErr(!!errors.phone)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
              )}
            />
            <FieldError id="err-phone" msg={errors.phone?.message} />
          </div>

          <div>
            <label htmlFor="university" className={labelCls}>Universidade / Instituto</label>
            <Controller
              name="university"
              control={control}
              render={({ field }) => (
                <select
                  id="university"
                  value={field.value ?? ''}
                  onChange={e => field.onChange(e.target.value)}
                  className={cn(inputErr(!!errors.university), 'cursor-pointer')}
                  aria-invalid={!!errors.university}
                  aria-describedby={errors.university ? 'err-university' : undefined}
                >
                  <option value="" disabled>Seleciona a tua instituição...</option>
                  {UNIVERSITIES.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              )}
            />
            <FieldError id="err-university" msg={errors.university?.message} />
          </div>

          <div>
            <label htmlFor="course" className={labelCls}>Curso</label>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <select
                  id="course"
                  value={field.value ?? ''}
                  onChange={e => field.onChange(e.target.value)}
                  className={cn(inputErr(!!errors.course), 'cursor-pointer')}
                  aria-invalid={!!errors.course}
                  aria-describedby={errors.course ? 'err-course' : undefined}
                >
                  <option value="" disabled>Seleciona o teu curso...</option>
                  {COURSES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            />
            <FieldError id="err-course" msg={errors.course?.message} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="academic_year" className={labelCls}>Ano curricular</label>
            <Controller
              name="academic_year"
              control={control}
              render={({ field }) => (
                <select
                  id="academic_year"
                  value={field.value ?? ''}
                  onChange={e => field.onChange(e.target.value)}
                  className={cn(inputErr(!!errors.academic_year), 'cursor-pointer')}
                  aria-invalid={!!errors.academic_year}
                  aria-describedby={errors.academic_year ? 'err-academic_year' : undefined}
                >
                  <option value="" disabled>Seleciona...</option>
                  {['1.º', '2.º', '3.º', '4.º', '5.º', 'Mestrado', 'Outro'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              )}
            />
            <FieldError id="err-academic_year" msg={errors.academic_year?.message} />
          </div>
        </div>
      </div>

      <div>
        <p id="lbl-has_event_xp" className={labelCls}>
          Já fizeste parte de uma equipa organizadora de um evento?
        </p>
        <Controller
          name="has_event_xp"
          control={control}
          render={({ field }) => (
            <RadioSet
              options={[{ label: 'Sim', value: true }, { label: 'Não', value: false }]}
              value={field.value}
              onChange={field.onChange}
              error={errors.has_event_xp?.message}
              errorId="err-has_event_xp"
            />
          )}
        />
        {hasXp === true && (
          <div className="mt-3">
            <label htmlFor="event_xp_desc" className={labelCls}>Descreve brevemente o teu papel</label>
            <textarea
              id="event_xp_desc"
              {...register('event_xp_desc')}
              rows={3}
              placeholder="Qual foi o evento e qual foi o teu papel?"
              className={inputErr(!!errors.event_xp_desc)}
              aria-invalid={!!errors.event_xp_desc}
              aria-describedby={errors.event_xp_desc ? 'err-event_xp_desc' : undefined}
            />
            <FieldError id="err-event_xp_desc" msg={errors.event_xp_desc?.message} />
          </div>
        )}
      </div>

      <div>
        <p className={labelCls}>Disponibilidade semanal estimada</p>
        <Controller
          name="availability"
          control={control}
          render={({ field }) => (
            <RadioSet
              options={[
                { label: '< 2h',  value: '<2h'  },
                { label: '2–4h',  value: '2-4h' },
                { label: '4–6h',  value: '4-6h' },
                { label: '> 6h',  value: '>6h'  },
              ]}
              value={field.value}
              onChange={field.onChange}
              error={errors.availability?.message}
              errorId="err-availability"
            />
          )}
        />
      </div>

      <div>
        <p className={labelCls}>Possibilidade de deslocação a Aveiro para reuniões presenciais</p>
        <Controller
          name="can_travel"
          control={control}
          render={({ field }) => (
            <RadioSet
              options={[
                { label: 'Sim',    value: 'Sim'    },
                { label: 'Não',    value: 'Não'    },
                { label: 'Talvez', value: 'Talvez' },
              ]}
              value={field.value}
              onChange={field.onChange}
              error={errors.can_travel?.message}
              errorId="err-can_travel"
            />
          )}
        />
      </div>
    </div>
  )
}

// ─── Step 2: Motivação & Setores ──────────────────────────────────────────────

function Step2({ form }: { form: AppForm }) {
  const { register, control, formState: { errors } } = form

  return (
    <div className="space-y-7">
      <p className="mono text-[0.58rem] text-gold/40 tracking-[0.25em] uppercase">
        Bloco 2 — Motivação & Setores de Interesse
      </p>

      <div>
        <label className={labelCls}>Em que setores tens interesse em colaborar?</label>
        <p className="mono text-[0.55rem] text-muted-foreground/35 tracking-wide mb-3">
          Seleciona e reordena por ordem de preferência.
        </p>
        <Controller
          name="sector_prefs"
          control={control}
          render={({ field }) => (
            <SectorDnD
              value={field.value as Sector[]}
              onChange={field.onChange}
              error={errors.sector_prefs?.message}
            />
          )}
        />
      </div>

      <div>
        <label className={labelCls}>Porque queres fazer parte da equipa organizadora do ENEEC 2027?</label>
        <textarea
          {...register('motivation')}
          rows={5}
          placeholder="A tua motivação..."
          className={inputCls}
        />
        <FieldError id="err-motivation" msg={errors.motivation?.message} />
      </div>

      <div>
        <label className={labelCls}>O que achas que podes trazer de diferente à equipa?</label>
        <textarea
          {...register('differentiation')}
          rows={4}
          placeholder="O que te distingue..."
          className={inputCls}
        />
        <FieldError id="err-differentiation" msg={errors.differentiation?.message} />
      </div>

      <div>
        <label className={labelCls}>Como tomaste conhecimento desta candidatura?</label>
        <Controller
          name="how_found_out"
          control={control}
          render={({ field }) => (
            <RadioSet
              options={[
                { label: 'Redes sociais',        value: 'Redes sociais'        },
                { label: 'Colega',               value: 'Colega'               },
                { label: 'Núcleo de estudantes', value: 'Núcleo de estudantes' },
                { label: 'E-mail',               value: 'E-mail'               },
                { label: 'Outro',                value: 'Outro'                },
              ]}
              value={field.value}
              onChange={field.onChange}
              error={errors.how_found_out?.message}
            />
          )}
        />
      </div>
    </div>
  )
}

// ─── Step 3: Perguntas por Setor ──────────────────────────────────────────────

type SectorErrors = Record<string, { q1?: { message?: string }; q2?: { message?: string }; q3?: { message?: string } } | undefined>

function Step3({ form, openAll }: { form: AppForm; openAll?: boolean }) {
  const { register, control, formState: { errors } } = form
  const sectors = (useWatch({ control, name: 'sector_prefs' }) ?? []) as Sector[]
  const [openSector, setOpenSector] = useState<string>(
    sectors[0] ? SECTOR_SLUGS[sectors[0]] : ''
  )

  // When parent triggers openAll (submit failed), expand first sector with errors
  useState(() => {
    if (openAll) {
      const firstWithError = sectors.find(s => {
        const slug = SECTOR_SLUGS[s]
        const e = (errors.sector_answers as SectorErrors)?.[slug]
        return !!e
      })
      if (firstWithError) setOpenSector(SECTOR_SLUGS[firstWithError])
    }
  })

  if (sectors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground mono">
        Nenhum setor selecionado. Volta ao passo anterior.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <p className="mono text-[0.58rem] text-gold/40 tracking-[0.25em] uppercase">
        Bloco 3 — Perguntas por Setor
      </p>

      {sectors.map((sector, sectorIdx) => {
        const slug     = SECTOR_SLUGS[sector]
        const qs       = SECTOR_QUESTIONS[sector]
        const isOpen   = openSector === slug
        const qErrors  = (errors.sector_answers as SectorErrors)?.[slug]
        const anyError = !!qErrors

        return (
          <div key={sector} className="border border-gold/10 rounded-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSector(isOpen ? '' : slug)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                isOpen ? 'bg-gold/8' : 'hover:bg-white/3'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="mono text-[0.52rem] text-gold/30">{sectorIdx + 1}.</span>
                <span className="text-sm font-semibold mono text-foreground/80">{sector}</span>
                {anyError && (
                  <span data-field-error className="text-[0.6rem] text-red-400 mono">— incompleto</span>
                )}
              </div>
              <span className={cn('mono text-xs', isOpen ? 'text-gold' : 'text-muted-foreground/30')}>
                {isOpen ? '▲' : '▼'}
              </span>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 pt-3 space-y-5 border-t border-gold/10">
                {qs.map((question, qi) => {
                  const qKey      = `q${qi + 1}` as 'q1' | 'q2' | 'q3'
                  const fieldName = `sector_answers.${slug}.${qKey}` as const
                  const qError    = qErrors?.[qKey]?.message

                  return (
                    <div key={qi}>
                      <label className={cn(labelCls, 'mb-1')}>Pergunta {qi + 1}</label>
                      <p className="text-sm text-foreground/70 mb-2 leading-relaxed">{question}</p>
                      <textarea
                        {...register(fieldName as Parameters<typeof register>[0])}
                        rows={4}
                        placeholder="A tua resposta..."
                        className={inputCls}
                      />
                      {qError && <p data-field-error className={errorCls}>{qError}</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
      <div className="w-14 h-14 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-2xl">
        ✓
      </div>
      <div className="space-y-3 max-w-sm">
        <h2 className="text-xl font-bold text-foreground">Candidatura enviada</h2>
        <p className="text-sm text-foreground/60 leading-relaxed">
          Obrigado pela tua candidatura. As candidaturas serão analisadas pela equipa de coordenação
          de cada departamento. Serás contactado/a pelo e-mail indicado.
        </p>
        <p className="text-sm text-foreground/60">
          Em caso de dúvida, contacta-nos em{' '}
          <a href="mailto:logistica.eneec@ua.pt" className="text-gold hover:underline">
            logistica.eneec@ua.pt
          </a>
          .
        </p>
      </div>
      <a
        href="/"
        className="mt-4 px-6 py-2.5 border border-gold/40 text-gold mono text-xs tracking-widest uppercase hover:bg-gold hover:text-[#080c14] transition-all rounded-sm"
      >
        Voltar ao início →
      </a>
    </div>
  )
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

const STEP_1_FIELDS: (keyof ApplicationInput)[] = [
  'full_name', 'email', 'phone', 'university', 'course',
  'academic_year', 'has_event_xp', 'event_xp_desc', 'availability', 'can_travel',
]
const STEP_2_FIELDS: (keyof ApplicationInput)[] = [
  'sector_prefs', 'motivation', 'differentiation', 'how_found_out',
]

export default function ApplicationForm() {
  const [step, setStep]               = useState(1)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [stepError, setStepError]     = useState('')
  const [isPending, startTransition]  = useTransition()

  const form = useForm<ApplicationInput, unknown, ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name:       '',
      email:           '',
      phone:           '',
      university:      '' as ApplicationInput['university'],
      course:          '' as ApplicationInput['course'],
      academic_year:   '',
      has_event_xp:    undefined as unknown as boolean,
      event_xp_desc:   '',
      availability:    '',
      can_travel:      '',
      sector_prefs:    [],
      motivation:      '',
      differentiation: '',
      how_found_out:   '',
      sector_answers:  {},
    },
    mode: 'onBlur',
  })

  const { handleSubmit, trigger } = form
  const [submitInvalid, setSubmitInvalid] = useState(false)

  async function goNext() {
    const fields = step === 1 ? STEP_1_FIELDS : STEP_2_FIELDS
    const valid = await trigger(fields)
    if (valid) {
      if (step === 1) {
        const exists = await checkEmailExists(form.getValues('email'))
        if (exists) {
          form.setError('email', { type: 'manual', message: 'Já existe uma candidatura com este email.' })
          setStepError('Preenche todos os campos assinalados antes de continuar.')
          return
        }
      }
      setStepError('')
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setStepError('Preenche todos os campos assinalados antes de continuar.')
      setTimeout(() => {
        // Focus first invalid input/select/textarea; fallback to scrolling to first error message
        const firstInvalid = document.querySelector<HTMLElement>(
          '[aria-invalid="true"], [data-field-error]'
        )
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
          if ('focus' in firstInvalid) firstInvalid.focus({ preventScroll: true })
        }
      }, 50)
    }
  }

  function goBack() {
    setStep(s => s - 1)
    setSubmitError('')
    setStepError('')
  }

  function onInvalid() {
    setSubmitInvalid(true)
    setStepError('Preenche todos os campos assinalados antes de submeter.')
    setTimeout(() => {
      const firstInvalid = document.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-field-error]'
      )
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if ('focus' in firstInvalid) firstInvalid.focus({ preventScroll: true })
      }
    }, 50)
  }

  function onSubmit(data: ApplicationInput) {
    setSubmitError('')
    setStepError('')
    setSubmitInvalid(false)
    startTransition(async () => {
      const result = await submitApplication(data)
      if (result.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(result.error ?? 'Erro ao submeter. Tenta novamente.')
      }
    })
  }

  if (submitted) return <SuccessScreen />

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      <ProgressBar step={step} />

      {step === 1 && <Step1 form={form} />}
      {step === 2 && <Step2 form={form} />}
      {step === 3 && <Step3 form={form} openAll={submitInvalid} />}

      {(stepError || submitError) && (
        <p className="mt-4 text-xs text-red-400 mono">
          {stepError || submitError}
        </p>
      )}

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gold/8">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="mono text-xs text-muted-foreground/50 hover:text-foreground/70 tracking-widest uppercase transition-colors"
          >
            ← Voltar
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="px-6 py-2.5 bg-gold text-[#080c14] text-sm font-bold mono rounded-sm hover:bg-gold-light transition-colors"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-gold text-[#080c14] text-sm font-bold mono rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {isPending ? 'A enviar...' : 'Submeter candidatura →'}
          </button>
        )}
      </div>
    </form>
  )
}
