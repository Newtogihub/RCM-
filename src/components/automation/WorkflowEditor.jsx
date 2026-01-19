import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import WorkflowSidebar from './WorkflowSidebar';
import { useImperativeHandle, forwardRef } from 'react';

const nodeTypes = {
    custom: CustomNode,
};

// Initial nodes for a fresh canvas
const initialNodes = [
    {
        id: '1',
        type: 'custom',
        position: { x: 250, y: 100 },
        data: { label: 'Start Trigger', type: 'webhook', description: 'POST /v1/webhook/start', color: '#F43F5E' },
    },
];

const WorkflowEditor = forwardRef((props, ref) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
        loadWorkflow: (newNodes, newEdges) => {
            setNodes(newNodes);
            setEdges(newEdges || []);
            // Fit view after a clear/load
            setTimeout(() => reactFlowInstance?.fitView(), 100);
        },
        getWorkflow: () => ({ nodes, edges }),
        addNode: (node) => setNodes((nds) => [...nds, node]),
        updateNode: (id, data) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === id) {
                        return {
                            ...node,
                            data: { ...node.data, ...data },
                        };
                    }
                    return node;
                })
            );
        },
    }));

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const nodeDataStr = event.dataTransfer.getData('application/nodedata');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type || !nodeDataStr) {
                return;
            }

            const nodeData = JSON.parse(nodeDataStr);

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: `node-${Date.now()}`,
                type,
                position,
                data: {
                    label: nodeData.label,
                    type: nodeData.type,
                    color: nodeData.color,
                    description: nodeData.desc
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes],
    );

    return (
        <div className="flex h-full w-full bg-slate-50 border border-gray-200 rounded-xl overflow-hidden">
            <ReactFlowProvider>
                {/* Sidebar with Draggable Items */}
                <WorkflowSidebar />

                <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={(event, node) => {
                            if (props.onNodeSelect) {
                                props.onNodeSelect(node);
                            }
                        }}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#6366f1' } }}
                        fitView
                    >
                        <Controls showInteractive={false} className="bg-white shadow-md border border-gray-100 p-1 rounded-lg" />
                        <Background color="#aaa" gap={16} />
                        <MiniMap
                            nodeStrokeColor={(n) => n.data.color || '#ddd'}
                            nodeColor={(n) => '#fff'}
                            maskColor="rgba(240, 240, 245, 0.6)"
                            className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
                        />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
});

export default WorkflowEditor;
