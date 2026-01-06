import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const CustomModal = ({title,description,redirectText,redirectLink}:{title:string,description:string,redirectLink:string,redirectText:string}) => {
  const [open, setOpen] = useState<boolean>(true)
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <NavLink to={redirectLink} className="px-6 py-1 rounded-full font-semibold bg-primary text-white">{redirectText}</NavLink>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal;