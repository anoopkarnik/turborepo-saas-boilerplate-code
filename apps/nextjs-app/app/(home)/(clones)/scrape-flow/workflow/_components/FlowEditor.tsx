"use client";

import React, { useCallback, useEffect } from "react";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AppNode, TaskType } from "@repo/ts-types/scrape-flow/node";
import NodeComponent from "./nodes/NodeComponent";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistry } from "../../_lib/workflow/tasks/registry";
import { CreateFlowNode } from "../../_lib/workflow/tasks/CreateFlowNode";

const nodeTypes = {
    Node: NodeComponent
}

const edgeTypes = {
  default: DeletableEdge
}

const snapGrid: [number,number] = [50,50];
const fitViewOptions = {padding: 2}

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const {setViewport, screenToFlowPosition, updateNodeData} = useReactFlow();


  useEffect(()=>{
    try{
      const flow = JSON.parse(workflow.definition);
      if(!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if(!flow.viewport) return;
      const {x=0, y=0, zoom=1} = flow.viewport;
      setViewport({x,y,zoom});
    }
    catch{
    }
  },[workflow.definition, setEdges, setNodes, setViewport])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },[])

  const onDrop = useCallback((event:React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData('application/reactflow');
    if (typeof taskType === "undefined" || !taskType) return;
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    })
    const newNode = CreateFlowNode(taskType as TaskType,position);
    setNodes((nodes) => [...nodes, newNode]);
  },[screenToFlowPosition, setNodes])

  const onConnect = useCallback((connection: Connection)=> {
     setEdges(eds => addEdge({...connection, animated:true},eds));
     if(!connection.targetHandle) return;

     const node = nodes.find(nd => nd.id === connection.target);
     if(!node) return;
     const nodeInputs = node.data.inputs;
     updateNodeData(node.id, {inputs: {
       ...nodeInputs, [connection.targetHandle]: ""}});
  },[setEdges, updateNodeData, nodes]) 

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // Prevent self connections
    if(connection.source === connection.target) return false;

    // Same taskParam type connections
    const source = nodes.find(nd => nd.id === connection.source);
    const target = nodes.find(nd => nd.id === connection.target);
    if(!source || !target) return false;

    // Check if the type of the output of the source task is the same as the type of the input of the target task
    const sourceTask = TaskRegistry[source.data.type];
    const targetTask = TaskRegistry[target.data.type];
    const output = sourceTask.outputs.find(out => out.name === connection.sourceHandle);
    const input = targetTask.inputs.find(inp => inp.name === connection.targetHandle);
    if(input?.type !== output?.type) return false;

    const hasCycle = (node: AppNode, visited = new Set()) => {
      if(visited.has(node.id)) return false;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node,nodes,edges)){
        if(outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };
    const detectedCycle = hasCycle(target);

    return !detectedCycle;
  },[nodes,edges])



  return (
    <main className="h-full w-full">

        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          nodeTypes={nodeTypes} 
          edgeTypes={edgeTypes} 
          snapToGrid 
          snapGrid={snapGrid} 
          fitView 
          fitViewOptions={fitViewOptions} 
          onDragOver={onDragOver} 
          onDrop={onDrop} 
          onConnect={onConnect}
          isValidConnection={isValidConnection}
        >
          <Controls position ="top-right" style={{color: "black"}} fitViewOptions={fitViewOptions}/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </ReactFlow>
    </main>
  );
};

export default FlowEditor;
