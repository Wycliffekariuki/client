import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, AlertCircle, CheckCircle2, Mail, Phone } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "../reduxstore/app/hooks";


interface IssueHeroCardProps {
  triggerAction: (type: "assign" | "severity" | "resolve") =>  void
};

export default function IssueHeroCard({ triggerAction}: IssueHeroCardProps) {
const select = useAppSelector;
const index = select((state) => state.selectedComplain.index);
const complain = select((state) => state.complains.complain[0][index]);
console.log("Complain from IssueHeroCard: ", complain);
console.log("Index from IssueHeroCard: ", index);

  const setModalType = (type: "assign" | "severity" | "resolve") => {
                triggerAction(type)
  }
  return (
    <Card className="w-full max-w-7xl bg-gradient-to-r from-white via-slate-50 to-white p-6 shadow-2xl rounded-2xl border-none bg-white">
        <Dialog>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={() => setModalType('assign')} className="bg-slate-200 text-slate-800 hover:bg-slate-300">
            Reassign Admin
          </Button>
          <Button onClick={() => setModalType('severity')}   className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Escalate Severity
          </Button>
        </div>

        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-slate-800 max-w-4xl  ">
            {complain.title}
          </h2>
          {complain.severity === 'H' && (
            <Badge className="text-white text-sm px-4 py-1 rounded-full font-medium bg-red-500">
            high
          </Badge>

          )}
          {complain.severity === 'M' && (
            <Badge className="text-white text-sm px-4 py-1 rounded-full font-medium bg-orange-600">
            medium
          </Badge>

          )}
          {complain.severity === 'L' && (
            <Badge className="text-white text-sm px-4 py-1 rounded-full font-medium bg-yellow-500">
            low
          </Badge>

          )}
          
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          {complain.complain}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-500 pt-4 border-t border-slate-200 mt-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{complain.user_id.first_name} {complain.user_id.last_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{complain.user_id.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{complain.user_id.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{complain.time_stamp}</span>
          </div>
          <div className="flex items-center gap-2">
            {complain.is_complete ? (
                          < CheckCircle2 className="w-5 h-5 text-green-600" />

            ): (
              < AlertCircle className="w-5 h-5 text-red-600" />

            )}
            {/* < AlertCircle className="w-5 h-5 text-red-600" /> */}
            <span className= {`' font-medium' ${complain.is_complete ? 'text-green-600' : 'text-red-600'}`}>{`${complain.is_complete ? 'completed' : 'pending'}`}</span>
          </div>
        </div>

        <div className="flex justify-start mt-6">
          {complain.is_complete ? (''): (
            <Button onClick={() => setModalType('resolve')}  className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Resolved
          </Button>
          )}
          
          
        </div>
      </CardContent>
      </Dialog>
    </Card>
  );
}
