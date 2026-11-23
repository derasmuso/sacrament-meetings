'use client';

import { useActionState } from 'react';
import type { Hymn, MeetingType, SacramentMeeting } from '@/lib/types';
import type { MeetingField, State } from '@/lib/actions';

const meetingTypeOptions: { value: MeetingType; label: string }[] = [
    { value: 'regular', label: 'Sacrament Meeting' },
    { value: 'testimony', label: 'Fast and Testimony Meeting' },
    { value: 'stake', label: 'Stake Conference' },
    { value: 'general', label: 'General Conference' },
    { value: 'special', label: 'Special Program' },
];

const labelClasses = 'block font-semibold mb-1';
const inputClasses =
    'block w-full rounded border border-gray-400 bg-white px-3 py-2 text-gray-900 ' +
    'focus:border-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ' +
    'aria-invalid:border-red-700';

const initialState: State = { message: null, errors: {} };

interface MeetingFormProps {
    action: (prevState: State, formData: FormData) => Promise<State>;
    meeting?: SacramentMeeting;
    submitLabel: string;
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const errors = state.errors ?? {};

    function startingValue(field: MeetingField, saved?: string | number): string | undefined {
        if (state.values) return state.values[field] ?? '';
        return saved?.toString();
    }

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label htmlFor="date" className={labelClasses}>Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={startingValue('date', meeting?.date)}
                    aria-describedby="date-error"
                    aria-invalid={errors.date ? true : undefined}
                    className={inputClasses}
                />
                <FieldError id="date-error" messages={errors.date} />
            </div>

            <div>
                <label htmlFor="meetingType" className={labelClasses}>Meeting type</label>
                <select
                    id="meetingType"
                    name="meetingType"
                    required
                    defaultValue={startingValue('meetingType', meeting?.meetingType) || 'regular'}
                    aria-describedby="meetingType-error"
                    aria-invalid={errors.meetingType ? true : undefined}
                    className={inputClasses}
                >
                    {meetingTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <FieldError id="meetingType-error" messages={errors.meetingType} />
            </div>

            <TextField
                name="presiding"
                label="Presiding"
                defaultValue={startingValue('presiding', meeting?.presiding)}
                errors={errors.presiding}
            />
            <TextField
                name="conducting"
                label="Conducting"
                defaultValue={startingValue('conducting', meeting?.conducting)}
                errors={errors.conducting}
            />

            <HymnFields
                prefix="openingHymn"
                legend="Opening hymn"
                hymn={meeting?.openingHymn}
                startingValue={startingValue}
                errors={errors}
            />
            <TextField
                name="openingPrayer"
                label="Invocation"
                defaultValue={startingValue('openingPrayer', meeting?.openingPrayer)}
                errors={errors.openingPrayer}
            />

            <TextAreaField
                name="announcements"
                label="Announcements"
                defaultValue={startingValue('announcements', meeting?.announcements?.join('\n'))}
                errors={errors.announcements}
            />
            <TextAreaField
                name="wardBusiness"
                label="Ward business"
                defaultValue={startingValue(
                    'wardBusiness',
                    meeting?.wardBusiness.map((item) => item.description).join('\n')
                )}
                errors={errors.wardBusiness}
            />

            <div>
                <div className="flex items-center gap-2">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        defaultChecked={
                            state.values ? state.values.stakeBusiness === 'on' : meeting?.stakeBusiness
                        }
                        aria-describedby="stakeBusiness-error"
                        className="h-5 w-5 accent-blue-800"
                    />
                    <label htmlFor="stakeBusiness">Stake business will be conducted</label>
                </div>
                <FieldError id="stakeBusiness-error" messages={errors.stakeBusiness} />
            </div>

            <HymnFields
                prefix="sacramentHymn"
                legend="Sacrament hymn"
                hymn={meeting?.sacramentHymn}
                startingValue={startingValue}
                errors={errors}
            />
            <HymnFields
                prefix="closingHymn"
                legend="Closing hymn"
                hymn={meeting?.closingHymn}
                startingValue={startingValue}
                errors={errors}
            />
            <TextField
                name="closingPrayer"
                label="Benediction"
                defaultValue={startingValue('closingPrayer', meeting?.closingPrayer)}
                errors={errors.closingPrayer}
            />

            <div id="form-message" aria-live="polite" aria-atomic="true">
                {state.message && (
                    <p className="rounded border border-red-700 bg-red-50 px-3 py-2 text-red-700">
                        {state.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? 'Saving…' : submitLabel}
            </button>
        </form>
    );
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {messages?.map((message) => (
                <p key={message} className="mt-1 text-sm text-red-700">
                    {message}
                </p>
            ))}
        </div>
    );
}

function TextField({
    name,
    label,
    defaultValue,
    errors,
}: {
    name: MeetingField;
    label: string;
    defaultValue?: string;
    errors?: string[];
}) {
    const errorId = `${name}-error`;
    return (
        <div>
            <label htmlFor={name} className={labelClasses}>{label}</label>
            <input
                id={name}
                name={name}
                type="text"
                required
                maxLength={255}
                defaultValue={defaultValue}
                aria-describedby={errorId}
                aria-invalid={errors ? true : undefined}
                className={inputClasses}
            />
            <FieldError id={errorId} messages={errors} />
        </div>
    );
}

function TextAreaField({
    name,
    label,
    defaultValue,
    errors,
}: {
    name: MeetingField;
    label: string;
    defaultValue?: string;
    errors?: string[];
}) {
    const hintId = `${name}-hint`;
    const errorId = `${name}-error`;
    return (
        <div>
            <label htmlFor={name} className={labelClasses}>{label}</label>
            <p id={hintId} className="text-sm text-gray-600 mb-1">Optional. Put each item on its own line.</p>
            <textarea
                id={name}
                name={name}
                rows={3}
                defaultValue={defaultValue}
                aria-describedby={`${hintId} ${errorId}`}
                aria-invalid={errors ? true : undefined}
                className={inputClasses}
            />
            <FieldError id={errorId} messages={errors} />
        </div>
    );
}

function HymnFields({
    prefix,
    legend,
    hymn,
    startingValue,
    errors,
}: {
    prefix: 'openingHymn' | 'sacramentHymn' | 'closingHymn';
    legend: string;
    hymn?: Hymn;
    startingValue: (field: MeetingField, saved?: string | number) => string | undefined;
    errors: NonNullable<State['errors']>;
}) {
    const numberField = `${prefix}Number` as const;
    const titleField = `${prefix}Title` as const;
    return (
        <fieldset>
            <legend className={labelClasses}>{legend}</legend>
            <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                <div>
                    <label htmlFor={numberField} className="block text-sm mb-1">Number</label>
                    <input
                        id={numberField}
                        name={numberField}
                        type="number"
                        min={1}
                        step={1}
                        required
                        defaultValue={startingValue(numberField, hymn?.number)}
                        aria-describedby={`${numberField}-error`}
                        aria-invalid={errors[numberField] ? true : undefined}
                        className={inputClasses}
                    />
                    <FieldError id={`${numberField}-error`} messages={errors[numberField]} />
                </div>
                <div>
                    <label htmlFor={titleField} className="block text-sm mb-1">Title</label>
                    <input
                        id={titleField}
                        name={titleField}
                        type="text"
                        required
                        defaultValue={startingValue(titleField, hymn?.title)}
                        aria-describedby={`${titleField}-error`}
                        aria-invalid={errors[titleField] ? true : undefined}
                        className={inputClasses}
                    />
                    <FieldError id={`${titleField}-error`} messages={errors[titleField]} />
                </div>
            </div>
        </fieldset>
    );
}