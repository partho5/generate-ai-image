import style from './PromptTextarea.module.scss';

interface PromptTextareaProps {
    value?: string,
    onChange?: (e) => void
}

const PromptTextarea = ({value, onChange}: PromptTextareaProps) => {
    return (
        <div>
            <textarea
                className={`${style.promptField}`}
                placeholder="Describe your image..."
                onChange={onChange}
                value={value}
                rows={5}
            ></textarea>
        </div>
    );
}

export default PromptTextarea;