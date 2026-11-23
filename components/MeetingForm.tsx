import type { Hymn, MeetingType, SacramentMeeting } from '@/lib/types';

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
    'focus:border-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800';

interface MeetingFormProps {
    action: (formData: FormData) => void | Promise<void>;
    meeting?: SacramentMeeting;
    submitLabel: string;
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
    return (
        <form action={action} className="space-y-6">
            <div>
                <label htmlFor="date" className={labelClasses}>Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={meeting?.date}
                    className={inputClasses}
                />
            </div>

            <div>
                <label htmlFor="meetingType" className={labelClasses}>Meeting type</label>
                <select
                    id="meetingType"
                    name="meetingType"
                    required
                    defaultValue={meeting?.meetingType ?? 'regular'}
                    className={inputClasses}
                >
                    {meetingTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <TextField name="presiding" label="Presiding" defaultValue={meeting?.presiding} />
            <TextField name="conducting" label="Conducting" defaultValue={meeting?.conducting} />

            <HymnFields prefix="openingHymn" legend="Opening hymn" hymn={meeting?.openingHymn} />
            <TextField name="openingPrayer" label="Invocation" defaultValue={meeting?.openingPrayer} />

            <TextAreaField
                name="announcements"
                label="Announcements"
                defaultValue={meeting?.announcements?.join('\n')}
            />
            <TextAreaField
                name="wardBusiness"
                label="Ward business"
                defaultValue={meeting?.wardBusiness.map((item) => item.description).join('\n')}
            />

            <div className="flex items-center gap-2">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    defaultChecked={meeting?.stakeBusiness}
                    className="h-5 w-5 accent-blue-800"
                />
                <label htmlFor="stakeBusiness">Stake business will be conducted</label>
            </div>

            <HymnFields prefix="sacramentHymn" legend="Sacrament hymn" hymn={meeting?.sacramentHymn} />
            <HymnFields prefix="closingHymn" legend="Closing hymn" hymn={meeting?.closingHymn} />
            <TextField name="closingPrayer" label="Benediction" defaultValue={meeting?.closingPrayer} />

            <button
                type="submit"
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
                {submitLabel}
            </button>
        </form>
    );
}

function TextField({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
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
                className={inputClasses}
            />
        </div>
    );
}

function TextAreaField({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
    const hintId = `${name}-hint`;
    return (
        <div>
            <label htmlFor={name} className={labelClasses}>{label}</label>
            <p id={hintId} className="text-sm text-gray-600 mb-1">Optional. Put each item on its own line.</p>
            <textarea
                id={name}
                name={name}
                rows={3}
                aria-describedby={hintId}
                defaultValue={defaultValue}
                className={inputClasses}
            />
        </div>
    );
}

function HymnFields({ prefix, legend, hymn }: { prefix: string; legend: string; hymn?: Hymn }) {
    return (
        <fieldset>
            <legend className={labelClasses}>{legend}</legend>
            <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                <div>
                    <label htmlFor={`${prefix}Number`} className="block text-sm mb-1">Number</label>
                    <input
                        id={`${prefix}Number`}
                        name={`${prefix}Number`}
                        type="number"
                        min={1}
                        step={1}
                        required
                        defaultValue={hymn?.number}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor={`${prefix}Title`} className="block text-sm mb-1">Title</label>
                    <input
                        id={`${prefix}Title`}
                        name={`${prefix}Title`}
                        type="text"
                        required
                        defaultValue={hymn?.title}
                        className={inputClasses}
                    />
                </div>
            </div>
        </fieldset>
    );
}