import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "../_lib/workflow/executionPlan";
import { AppNode } from "@repo/ts-types/scrape-flow/node";
import useFlowValidation from "./useFlowValidation";
import { useToast } from "@repo/ui/hooks/use-toast";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();
    const {setInvalidInputs,clearErrors} = useFlowValidation();
    const {toast} = useToast();

    const handleError = useCallback((error:any)=>{
        switch(error.type){
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                toast({title: 'No entry point found', variant: 'destructive'});
                setInvalidInputs(error.invalidElements);
                break
            case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                console.log(error)
                toast({title: 'Not all inputs values are set', variant: 'destructive'});
                setInvalidInputs(error.invalidElements);
                break
            default:
                toast({title: 'Something went wrong', variant: 'destructive'});
                break
        }
    },[setInvalidInputs,toast]);

    const generateExecutionPlan = useCallback(()=>{
        const {nodes,edges} = toObject();
        const {executionPlan,error}  = FlowToExecutionPlan(nodes as AppNode[],edges);
        if(error){
            handleError(error);
            return null;
        }
        clearErrors();
        return executionPlan;
    },[toObject,handleError,clearErrors])
    
    return generateExecutionPlan
};

export default useExecutionPlan;