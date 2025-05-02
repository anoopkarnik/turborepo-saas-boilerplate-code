import { SettingsHeaderProps } from '@repo/ts-types/home/v1'

const SettingsHeading = ({title,description,children}:SettingsHeaderProps) => {
  return (
    <div className="my-10 px-10 overflow-auto scrollbar scrollbar-track-secondary scrollbar-thumb-sidebar">
        <div className="text-emphasis ">{title}</div>
        <div className= "text-description pb-2 border-b-2 mb-4">{description}</div>
        {children}
    </div>
  )
}

export default SettingsHeading