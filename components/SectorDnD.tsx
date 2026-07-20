'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  X,
  Handshake,
  Microscope,
  Megaphone,
  Package,
  Palette,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { SECTORS, SECTOR_SHORT, type Sector } from '@/lib/sectors'
import { cn } from '@/lib/utils'

const SECTOR_ICONS: Record<Sector, LucideIcon> = {
  'Relações Institucionais & Empresariais': Handshake,
  'Científico & Pedagógico':               Microscope,
  'Comunicação & Marketing':               Megaphone,
  'Logística':                             Package,
  'Cultural':                              Palette,
  'Financeiro':                            TrendingUp,
}

interface SectorDnDProps {
  value: Sector[]
  onChange: (value: Sector[]) => void
  error?: string
}

function SortableRow({ sector, index, onRemove }: { sector: Sector; index: number; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sector })

  const Icon = SECTOR_ICONS[sector]

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center gap-2.5"
    >
      {/* Order number */}
      <span className="mono text-[0.52rem] text-gold/55 w-4 text-right flex-shrink-0">{index + 1}.</span>

      {/* Row */}
      <div className={cn('flex-1 flex items-center gap-3 px-3 py-2.5 border border-gold/30 bg-gold/8 rounded-sm relative overflow-hidden', isDragging && 'shadow-lg shadow-gold/10')}>
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          style={{ touchAction: 'none' }}
          className="cursor-grab active:cursor-grabbing text-gold/50 hover:text-gold/80 flex-shrink-0 transition-colors p-1 -m-1"
          aria-label="Arrastar"
        >
          <GripVertical size={13} />
        </button>

        {/* Icon */}
        <div className="flex-shrink-0 w-7 h-7 rounded-sm border border-gold/35 bg-gold/10 flex items-center justify-center">
          <Icon size={13} className="text-gold/70" strokeWidth={1.5} />
        </div>

        {/* Name */}
        <span className="flex-1 text-xs font-semibold text-gold mono leading-snug truncate">{sector}</span>

        {/* Remove */}
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 text-gold/50 hover:text-gold/80 transition-colors"
          aria-label={`Remover ${sector}`}
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}

export function SectorDnD({ value, onChange, error }: SectorDnDProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const available = SECTORS.filter(s => !value.includes(s))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as Sector)
      const newIndex = value.indexOf(over.id as Sector)
      onChange(arrayMove(value, oldIndex, newIndex))
    }
  }

  function toggle(sector: Sector) {
    if (value.includes(sector)) {
      onChange(value.filter(s => s !== sector))
    } else {
      onChange([...value, sector])
    }
  }

  return (
    <div className="space-y-5">

      {/* Available */}
      {available.length > 0 && (
        <div>
          <p className="mono text-[0.55rem] text-gold/40 tracking-[0.25em] uppercase mb-3">
            Disponíveis — clica para selecionar
          </p>
          <div className="divide-y divide-gold/6 border-t border-gold/6">
            {available.map(sector => {
              const Icon = SECTOR_ICONS[sector]
              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => toggle(sector)}
                  className={cn(
                    'group w-full flex items-start gap-3 py-3 text-left',
                    'relative overflow-hidden transition-all duration-300',
                    'hover:border-gold/20'
                  )}
                >
                  {/* Hover background fill */}
                  <div className="absolute inset-0 bg-gold/4 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                  {/* Icon */}
                  <div className={cn(
                    'relative z-10 flex-shrink-0 w-8 h-8 rounded-sm border border-gold/15 bg-gold/5',
                    'flex items-center justify-center transition-all duration-300',
                    'group-hover:border-gold/45 group-hover:bg-gold/12'
                  )}>
                    <Icon size={14} className="text-gold/40 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 pt-0.5">
                    <p className={cn('text-xs font-semibold text-foreground/65 leading-snug mono mb-0.5 transition-colors duration-300 group-hover:text-foreground/90')}>
                      {sector}
                    </p>
                    <p className={cn('text-[0.63rem] text-muted-foreground/60 leading-snug transition-colors duration-300 group-hover:text-muted-foreground/80')}>
                      {SECTOR_SHORT[sector]}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Selected + sortable */}
      {value.length > 0 && (
        <div>
          <p className="mono text-[0.55rem] text-gold/40 tracking-[0.25em] uppercase mb-3">
            Selecionados — arrasta para ordenar por preferência
          </p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={value} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {value.map((sector, i) => (
                  <SortableRow
                    key={sector}
                    sector={sector}
                    index={i}
                    onRemove={() => toggle(sector)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {error && <p className="text-xs text-red-400 mono mt-1">{error}</p>}
    </div>
  )
}
