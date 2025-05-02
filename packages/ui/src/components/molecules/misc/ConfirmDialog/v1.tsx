import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../shadcn/alert-dialog"
import React from 'react'

const ConfirmDialog = ({buttonDiv,alertTitle, alertDescription, alertActionText, alertCancelText = "Cancel", alertActionFunction}:any) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild >
            <div className="cursor-pointer">{buttonDiv}</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={alertActionFunction}>{alertActionText}</AlertDialogAction>
                <AlertDialogCancel>{alertCancelText}</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog