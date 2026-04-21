"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

interface HistoryTableProps {
  data: any[];
  onRowClick: (clip: any) => void;
}

export function HistoryTable({ data, onRowClick }: HistoryTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="w-[300px]">Judul</TableHead>
              <TableHead>Topik</TableHead>
              <TableHead>Skor Viral</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer border-white/5 hover:bg-white/5 transition-colors group"
                  onClick={() => onRowClick(item)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <PlayCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="truncate max-w-[200px]">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-white/5 border-white/10 text-xs">
                      {item.topic}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="w-full h-2 max-w-[60px] bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                          style={{ width: `${item.viral_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">{item.viral_score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        item.status === 'completed' 
                        ? 'bg-green-500/10 text-green-400 border-green-400/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-400/20'
                      }
                      variant="outline"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-blue-500/10 hover:text-blue-400">
                      Lihat
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Belum ada riwayat klip.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Menampilkan {data.length} hasil
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
            <ChevronLeft className="h-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
            <ChevronRight className="h-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
